import { useState, useEffect } from "react";
import { notification } from "antd";
import swal from "sweetalert";
import axios from "axios";

export const useForm = (validate: any) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validate(values));
    // Your url for API
    const url = "api/auth/login";
    if (Object.keys(values).length === 2) {
      axios
        .post(url, {
          ...values,
        })
        .then((res) => {
          setShouldSubmit(true);
          axios.defaults.headers['Authorization'] = res.data.token;
          localStorage.setItem('$IevTd', res.data.token);
          swal({
            icon: "success",
            title: res.data.message,
            text: "ระบบจะทำการ redirect ท่านไปที่หน้าดูข้อมูล",
            buttons: {
              confirm: {
                text: "ไปกันเลย",
              },
            },
          }).then(() => {
            window.location.href = '/'+ res.data.role;
          });
        })
        .catch((error) => {
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('$IevTd');
          localStorage.removeItem('authenticate');
          swal(error.response.data.message, "", "error");
        });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
