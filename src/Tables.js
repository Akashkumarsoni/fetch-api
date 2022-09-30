import {
  Page,
  Card,
  DataTable,
  Pagination,
  Spinner,
  Select,
  ButtonGroup,
  Button,
  TextField,
  Heading,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  Frame,
  Loading,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { useLocation } from "react-router-dom";
import SelectInput from "./Selectinput";

function Dashboard() {
  const location = useLocation();
  const [datas, setDatas] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [counts, setCounts] = useState(10);
  const [pages, setPages] = useState(1);
  const [datacount, setDataCount] = useState(0);
  const [selectuid, setSelectuid] = useState("");
  const [inpuid, setInpuid] = useState("");
  const [allkeys, setAllkeys] = useState([
    "user_id",
    "catalog",
    "username",
    "shops.email",
    "shopify_plan",
    "shopify.updated_at",
    "created_at",
    "shop_url",
  ]);

  const optionsuid = [
    { label: "Equals", value: "1" },
    { label: "Not Equal", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Not Contains", value: "4" },
    { label: "Starts with", value: "5" },
    { label: "Ends with", value: "6" },
  ];
  const handleSelectInputs = useCallback((value) => setInpuid(value), []);

  const handleSelectUid = useCallback((value) => {
    // alert(inpuid);
    // setSelectuid(value);
    // if (inpuid == "") {
    //   alert("Input field is empty!");
    // } else {
    showfilterresult(pages, counts, value, "43453", "user_id");
    // }
  }, []);
  const [inputText, setInputText] = useState("9090-99");
  const [optionText, setOptionText] = useState("");
  const getText = (e) => {
    setInputText(e);
  };
  const getSelectValue = (e) => {
    setOptionText(e);
  };
  const getdata=(data)=>{
    setInpuid(data);
  }
  const getselectdata=(a)=>{
    console.log(a)
  }
  console.log(inpuid)
  const [showselect, setShowselect] = useState(
    allkeys.map((i,index) => [
      <SelectInput plcaeholder={i} getdata={getdata} getselectdata={getselectdata} index={index}/>
      
    ])
  );

  const handleSelectCounts = useCallback((value) => setCounts(value), []);

  const row_options = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
    { label: "50", value: "50" },
  ];
  const showresult = (pg, ct) => {
    pg = pages;
    ct = counts;
    setLoading(true);
    const url = `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${pages}&count=${counts}`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading("over");
        console.log(json);
        localStorage.setItem("data", JSON.stringify(json.data.rows));
        setDatas([...json.data.rows]);
        setRows(
          json.data.rows.map((i) => [
            i.user_id,
            i.catalog,
            i.username,
            i.shopify.email,
            i.shopify_plan,
            i.shopify.updated_at,
            i.created_at,
            i.shop_url,
          ])
        );
        setLoading(false);
        setDataCount(json.data.count);
        console.log(json.data.rows);
      })
      .catch((e) => {
        setLoading("load");
        console.log(e);
      });
  };
  const showfilterresult = (pg, ct, value, inpts, paltform) => {
    pg = pages;
    ct = counts;
    setLoading(true);
    setRows([]);
    const url = `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${pg}&count=${ct}&filter[user_id][4]=43670`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading("over");
        console.log(json);
        localStorage.setItem("data", JSON.stringify(json.data.rows));
        setDatas([...json.data.rows]);
        setRows(
          json.data.rows.map((i) => [
            i.user_id,
            i.catalog,
            i.username,
            i.shopify.email,
            i.shopify_plan,
            i.shopify.updated_at,
            i.created_at,
            i.shop_url,
          ])
        );
        setLoading(false);
        setDataCount(json.data.count);
      })
      .catch((e) => {
        setLoading("load");
        console.log(e);
      });
  };
  React.useEffect(() => {
    showresult(pages, counts);
  }, []);

  const alldata = [showselect, ...rows];

  const viewres = () => {
    showresult();
  };

  return (
    <>
      {!sessionStorage.getItem("token") ? (
        <>
          <div className="errorpage">
            <img alt="" src="error.png" />
            <h2>Error 404</h2>
          </div>
        </>
      ) : (
        <>
          <Page title="">
            <Heading>
              Showing from {(Number(pages) - 1) * Number(counts) + 1} to{" "}
              {Number(counts) - 1 + ((Number(pages) - 1) * Number(counts) + 1)}{" "}
              of {datacount} Users
            </Heading>
            <Card>
              <Page>
                <Page>
                  <Pagination
                    label={pages}
                    hasPrevious={pages > 1}
                    onPrevious={() => {
                      if (pages > 1) {
                        setPages(pages - 1);
                        showresult(Number(pages) - 1, counts);
                      }
                    }}
                    hasNext
                    onNext={() => {
                      setPages(pages + 1);
                      showresult(Number(pages) + 1, counts);
                    }}
                  />

                  <Select
                    label="Select rows"
                    options={row_options}
                    onChange={handleSelectCounts}
                    value={counts}
                  />
                </Page>
                <Page>
                  <Button destructive onClick={viewres}>
                    View Result
                  </Button>
                </Page>
              </Page>
            </Card>
          </Page>
          <Page title="Sales by product">
            {/* {showfilterresult()} */}
            <Card>
              {loading === false ? (
                <DataTable
                  columnContentTypes={[
                    "text",
                    "numeric",
                    "text",
                    "text",
                    "text",
                    "text",
                    "text",
                    "text",
                  ]}
                  headings={[
                    "User Id",
                    "Catalog",
                    "Shop domain",
                    "Shop email",
                    "Shop plan",
                    "Updated at",
                    "Created at",
                    "Shops myshopify domain",
                  ]}
                  rows={alldata}
                />
              ) : (
                <>
                  <div style={{ height: "100px" }}>
                    <Frame>
                      <Loading />
                    </Frame>
                  </div>
                </>
              )}
            </Card>
          </Page>{" "}
        </>
      )}
    </>
  );
}
export default Dashboard;
