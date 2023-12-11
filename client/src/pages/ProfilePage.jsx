import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "../components/EditProfile/EditProfile";
import { Routes, Route } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { useRequireAuth } from "../hooks/useRequireAuth";

function ProfilePage() {
  const { state } = useProvideAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    password: "",
    current_password: "",
    confirm_password: "",
    isSubmitting: false,
    errorMessage: null,
  });

  let navigate = useNavigate();
  let params = useParams();
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await api.get(`/users/${params.uname}`);
        setUser(userResponse.data);
        setProfileImage(userResponse.data.profile_image);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uname, isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const handleInputChange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    };

    const handleUpdatePassword = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (data.password !== data.confirm_password) {
        toast.error("Passwords Do Not Match");
        return;
      }
      if (data.password.length < 8 || data.password.length > 20) {
        toast.error("Password Must Be Between 8 and 20 Characters");
        return;
      }
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        setValidated(true);
        return;
      }
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null,
      });
      try {
        const response = await api.put(`/users/${params.uname}`, {
          confirm_password: data.confirm_password,
          password: data.password,
          current_password: data.current_password,
        });
        const {
          user: { uid, username },
        } = state;
        console.log(data.password, uid, username);
        setValidated(false);
        setLoading(false);
        toast.success("Password Updated");
      } catch (error) {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message,
        });
      }
    };

    if (!isAuthenticated) {
      return;
    }

    if (loading) {
      return;
    }

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <img
              src=""
              alt="Profile Picture"
              className="img-fluid rounded-circle"
            />
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">About Us</h5>
                <p>
                  This is where the user will write about their pupum and
                  themselves.
                </p>
              </div>
            </div>
            <Routes>
              <Route />
            </Routes>
            {/* <Link to={<EditProfile />} className="btn btn-primary mt-3">
            Edit Profile
          </Link> */}
          </div>
        </div>
      </div>
    );
  };
}

export default ProfilePage;
