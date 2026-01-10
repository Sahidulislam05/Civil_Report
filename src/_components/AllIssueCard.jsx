import { FaArrowUp } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SpotlightCard from "../components/ReactBits/SpotlightCard";

export default function AllIssueCard({ issue }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const hasUpvoted =
    user && Array.isArray(issue.upvotes) && issue.upvotes.includes(user.email);

  const upvoteMutation = useMutation({
    mutationFn: async () => axiosSecure.post(`/issues/${issue._id}/upvote`),

    onMutate: async () => {
      await queryClient.cancelQueries(["all-issues"]);
      const previous = queryClient.getQueryData(["all-issues"]);

      queryClient.setQueryData(["all-issues"], (old) => {
        if (!old) return old;
        return {
          ...old,
          issues: old.issues.map((i) =>
            i._id === issue._id
              ? {
                ...i,
                upvoteCount: (i.upvoteCount || 0) + 1,
                upvotes: [...(i.upvotes || []), user.email],
              }
              : i
          ),
        };
      });

      return { previous };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["all-issues"], context.previous);
      toast.error(err.response?.data?.error || "Upvote failed");
    },

    onSettled: () => queryClient.invalidateQueries(["all-issues"]),
  });

  const handleUpvote = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (issue.email === user.email) {
      toast.error("You cannot upvote your own issue");
      return;
    }

    if (hasUpvoted) {
      toast.error("You already upvoted this issue");
      return;
    }

    upvoteMutation.mutate();
  };

  return (
    <SpotlightCard className="h-full bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full bg-base-100/50 backdrop-blur-sm">
        {issue.image && (
          <figure className="relative">
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-48 object-cover"
            />
          </figure>
        )}

        <div className="card-body flex flex-col grow p-5">
          {issue.priority === "high" && (
            <span className="badge badge-error absolute top-3 right-3 shadow-sm z-10 text-white font-bold">
              Boosted
            </span>
          )}

          <h2 className="card-title text-lg font-bold line-clamp-2 text-base-content group-hover:text-primary transition-colors">
            {issue.title}
          </h2>
          <p className="text-base-content/70 text-sm line-clamp-3 mt-1">
            {issue.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="badge badge-outline text-base-content/80">
              {issue.category || "General"}
            </span>
            <span className={`badge ${issue.status === 'resolved' ? 'badge-success text-white' : 'badge-info text-white'}`}>
              {issue.status}
            </span>
            <span className="badge badge-ghost bg-base-200">
              {issue.priority || "Normal"}
            </span>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex justify-between text-xs text-base-content/60 mb-3 font-medium">
              <span>{issue.upvoteCount || 0} Upvotes</span>
              <span>{new Date(issue.createdAt).toLocaleDateString("en-US")}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleUpvote}
                disabled={upvoteMutation.isLoading || hasUpvoted}
                className={`btn btn-sm flex-1 gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 ${hasUpvoted ? "btn-disabled opacity-50" : "btn-outline text-primary"
                  }`}
              >
                <FaArrowUp /> {hasUpvoted ? "Voted" : "Upvote"}
              </button>

              <Link
                to={`/issues-details/${issue._id}`}
                className="btn btn-sm btn-primary flex-1 shadow-lg shadow-primary/30"
              >
                View Details
              </Link>
            </div>
          </div>

          {hasUpvoted && (
            <p className="text-[10px] text-green-500 mt-2 text-center font-bold tracking-wide uppercase">
              You Upvoted
            </p>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
