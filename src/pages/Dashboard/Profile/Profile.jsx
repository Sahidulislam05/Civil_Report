import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserInfo from "../../../hooks/useUserInfo";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, isLoading] = useUserInfo();

  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get("/my-payments");
        setPayments(res.data);
      } catch (err) {
        // console.error(
        //   "Failed to load payments:",
        //   err.response?.status,
        //   err.response?.data
        // );

        Swal.fire({
          icon: "error",
          title: "Payments Error",
          text: err.response?.data?.message || "Could not load payments",
        });
      } finally {
        setLoadingPayments(false);
      }
    };

    fetchPayments();
  }, [axiosSecure, user?.email]);

  const handleSubscribe = async () => {
    try {
      const res = await axiosSecure.post("/create-checkout-session");
      window.location.replace(res.data.url);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text:
          err.response?.data?.message || "Payment failed, please try again.",
      });
    }
  };

  const handleDownloadInvoice = async (paymentId) => {
    if (!paymentId) {
      return Swal.fire({
        icon: "warning",
        title: "Invoice not found",
        text: "No payment record available",
      });
    }

    try {
      const res = await axiosSecure.get(`/payment/${paymentId}/invoice`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      // console.error("Invoice download failed:");
      // Swal.fire({
      //   icon: "error",
      //   title: "Download Failed",
      //   text: "Could not download invoice",
      // });
    }
  };

  if (isLoading || loadingPayments) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const latestPayment = payments[0]; // newest first

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-base-100 shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <div className="flex flex-col items-center justify-center p-6">
          <img
            src={user?.photoURL}
            alt="profile"
            className="rounded-full h-24 w-24 border-2 border-base-300"
          />

          <p className="mt-2 text-sm bg-neutral text-neutral-content px-4 py-1 rounded-full">
            {userInfo?.role}
          </p>

          {userInfo?.blocked && (
            <div className="w-full bg-red-500 mt-3 text-white px-3 py-2 rounded-lg text-center font-semibold">
              ⛔ Your account is blocked
            </div>
          )}

          <p className="mt-3 text-xl font-medium text-base-content">
            {user?.displayName}
            {userInfo?.premium && (
              <span className="ml-2 bg-warning text-warning-content px-2 py-1 rounded-full text-xs">
                ⭐ Premium
              </span>
            )}
          </p>

          <p className="text-base-content/70">{user?.email}</p>

          {/* Invoice Button */}
          {userInfo?.premium && latestPayment && (
            <div className="w-1/2 px-6 mt-6">
              <button
                onClick={() => handleDownloadInvoice(latestPayment._id)}
                className="w-full py-2 rounded-lg text-white bg-green-600 hover:bg-green-800"
              >
                📄 Download Invoice
              </button>
            </div>
          )}

          {/* Edit Profile Button */}
          <div className="w-full px-6 mt-4">
            <button
              onClick={() => document.getElementById("edit_profile_modal").showModal()}
              className="btn btn-outline w-full"
            >
              Edit Profile
            </button>
          </div>

          {/* Existing Subscribe Button */}
          {!userInfo?.premium && (
            <div className="w-full px-6 mt-4">
              <button
                onClick={handleSubscribe}
                disabled={userInfo?.blocked}
                className={`w-full py-2 rounded-lg text-white ${userInfo?.blocked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-800"
                  }`}
              >
                Subscribe 1000tk
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const _name = e.target.name.value;
              const _photoURL = e.target.photoURL.value;

              try {
                // Update Firebase Profile
                await updateUser({ displayName: _name, photoURL: _photoURL });

                // Optionally update backend if needed, but for now Firebase is primary source for display
                // await axiosSecure.patch('/user/profile', { name: _name, image: _photoURL });

                Swal.fire({
                  icon: 'success',
                  title: 'Profile Updated',
                  text: 'Your profile has been updated successfully.'
                });

                // Close modal
                document.getElementById("edit_profile_modal").close();

                // Reload window or invalidate query to refresh data if using backend data
                // window.location.reload(); 
              } catch (error) {
                // console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: 'Update Failed',
                  text: error.message
                });
              }
            }}
            className="py-4 space-y-4"
          >
            <div className="form-control">
              <label className="label">Name</label>
              <input name="name" type="text" defaultValue={user?.displayName} className="input input-bordered w-full" required />
            </div>
            <div className="form-control">
              <label className="label">Photo URL</label>
              <input name="photoURL" type="text" defaultValue={user?.photoURL} className="input input-bordered w-full" required />
            </div>
            <button type="submit" className="btn btn-primary w-full">Update Data</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
