import React from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  Page,
  Spinner,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [clicked, setClicked] = React.useState("no");
  const handleEmailChange = useCallback((value) => setUser(value), []);
  
  const handleSubmit = async (event) => {
    setClicked("yes")
    event.preventDefault();
    const inps = new FormData(event.currentTarget);
    const data = {
      username: user,
      password: pass,
    };
    
    const url = new URL("https://fbapi.sellernext.com/user/login");
    for (let i in data) {
      url.searchParams.append(i, data[i]);
    }
    fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        sessionStorage.setItem("token", json.data.token);
        if (sessionStorage.getItem("token") === "undefined") {
          alert("Wrong credentials");
          setClicked("no");
        } else {
          navigate("/dashboard", {
            state: { mytoken: sessionStorage.getItem("token") },
          });
          setClicked("no");
          setUser("");
          setPass("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Page title="Login">
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={user}
              onChange={handleEmailChange}
              label="Email"
              autoComplete="email"
              helpText={
                <span>We’ll use this email address to authenticate you.</span>
              }
            />

            <TextField
              onChange={(e) => setPass(e)}
              label="Password"
              type="password"
              value={pass}
              helpText={
                <span>We’ll use this password to authenticate you.</span>
              }
            />
            <Button primary submit>
              {clicked == "no"? <>Submit</> :<Spinner accessibilityLabel="Spinner example" size="small" />}
            </Button>
          </FormLayout>
        </Form>{" "}
      </Card>
    </Page>
  );
};

export default Login;
