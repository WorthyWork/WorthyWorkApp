import React, { useEffect, useState } from "react";
import { Grid, Box, IconButton } from "@mui/material";
import JobTitleCard from "./components/JobTitleCard";
import OthersCard from "./components/OthersCard";
import DividerTitle from "./components/DividerTitle";
import Footer from "../../container/footer";
import Typography from "@mui/material/Typography";
import variables from "../../styles/variables";
import { Root } from "./StyleComponents";
import Chart from "./components/Chart/index";
import { useHistory } from "react-router-dom";
import ApplyCard from "./components/ApplyCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IllegalDialog from "./components/IllegalDialog";
import { CheckIllegalBtn } from "./StyleComponents";

const scrollToAnchor = (anchorname) => {
  if (anchorname) {
    const anchorElement = document.getElementById(anchorname);
    if (anchorElement) {
      anchorElement.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "start",
      });
    }
  }
};

export default function JobCompare() {
  let history = useHistory();
  const selectItemA = JSON.parse(localStorage.getItem("selectItemA"));
  const selectItemB = JSON.parse(localStorage.getItem("selectItemB"));
  const illegalA = JSON.parse(localStorage.getItem("illegalA"));
  const illegalB = JSON.parse(localStorage.getItem("illegalB"));
  const capitalA = JSON.parse(localStorage.getItem("capitalA"));
  const capitalB = JSON.parse(localStorage.getItem("capitalB"));
  // const selectItemA = location.selectItemA ? location.selectItemA : "";
  // const selectItemB = location.selectItemB ? location.selectItemB : "";
  // const illegalA = location.illegalA;
  // const illegalB = location.illegalB;
  // const capitalA = location.capitalA[0]
  //   ? location.capitalA[0].Capital_Stock_Amount
  //   : "";
  // const capitalB = location.capitalB[0]
  //   ? location.capitalB[0].Capital_Stock_Amount
  //   : "";
  const [openDialog, setOpenDialog] = useState(false);
  const [sendIllegalData, setSendIllefalData] = useState([]);
  const handleOpenDialog = (data) => {
    // illegal dialog ???
    setSendIllefalData(data);
    setOpenDialog(true);
  };

  const backToHomePage = () => {
    history.push("/home");
  };

  const dividerData = ["????????????", "????????????", "????????????"];

  const companyDataA = [
    {
      title: "?????????",
      value: capitalA === null ? "3000000 ??? " : capitalA + "???",
    },
    // "?????????(?????????????????????????????????)"
    {
      title: "????????????????????????",
      value: illegalA.length > 0 ? illegalA.length + "???" : "0???",
      checkDetail:
        illegalA.length > 0 ? (
          <CheckIllegalBtn
            variant="outlined"
            onClick={() => handleOpenDialog(illegalA)}
          >
            ??????????????????
          </CheckIllegalBtn>
        ) : null,
    },
  ];

  const companyDataB = [
    {
      title: "?????????",
      value: capitalB === null ? "115000000 ???" : capitalB + "???",
    },
    {
      title: "????????????????????????",
      value: illegalB.length > 0 ? illegalB.length + "???" : "0???",
      checkDetail:
        illegalB.length > 0 ? (
          <CheckIllegalBtn
            variant="outlined"
            sx={{ color: variables.Focus_Green }}
            onClick={() => handleOpenDialog(illegalB)}
          >
            ??????????????????
          </CheckIllegalBtn>
        ) : null,
    },
  ];

  const vacancyDataA = [
    {
      title: "????????????",
      value: selectItemA
        ? selectItemA.SALARY_U
          ? selectItemA.SALARYCD +
            selectItemA.SALARY_L +
            "-" +
            selectItemA.SALARY_U
          : selectItemA.SALARYCD + selectItemA.SALARY_L
        : "?????????",
    },
    { title: "????????????", value: selectItemA ? selectItemA.WK_TYPE : "" },
    {
      title: "????????????",
      additionInfo: selectItemA ? selectItemA.WKTIME : "",
      value: "0830-1730",
    },
    { title: "????????????", value: selectItemA ? selectItemA.CITYNAME : "" },
    { title: "??????", value: selectItemA ? selectItemA.EDGRDESC : "" },
    { title: "????????????", value: selectItemA ? selectItemA.JOB_DETAIL : "" },
  ];
  const vacancyDataB = [
    {
      title: "????????????",
      value: selectItemB
        ? selectItemB.SALARY_U
          ? selectItemB.SALARYCD +
            selectItemB.SALARY_L +
            "-" +
            selectItemB.SALARY_U
          : selectItemB.SALARYCD + selectItemB.SALARY_L
        : "?????????",
    },
    { title: "????????????", value: selectItemB ? selectItemB.WK_TYPE : "" },
    {
      title: "????????????",
      additionInfo: selectItemB ? selectItemB.WKTIME : "",
      value: "0830-1730",
    },
    { title: "????????????", value: selectItemB ? selectItemB.CITYNAME : "" },
    { title: "??????", value: selectItemB ? selectItemB.EDGRDESC : "" },
    { title: "????????????", value: selectItemB ? selectItemB.JOB_DETAIL : "" },
  ];

  const companyA = [
    {
      positionName: selectItemA ? selectItemA.OCCU_DESC : "",
      company: selectItemA ? selectItemA.COMPNAME : "",
    },
    companyDataA,
    vacancyDataA,
  ];

  const companyB = [
    {
      positionName: selectItemB ? selectItemB.OCCU_DESC : "",
      company: selectItemB ? selectItemB.COMPNAME : "",
    },
    companyDataB,
    vacancyDataB,
  ];

  useEffect(() => {
    /* eslint-disable */
    scrollToAnchor("top");
  }, []);

  return (
    <Root id="top">
      <IllegalDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        sendIllegalData={sendIllegalData}
      />
      <Grid container>
        <Box pl={"4rem"} position="fixed">
          <IconButton onClick={backToHomePage}>
            <ArrowBackIcon sx={{ color: variables.Green, fontSize: "2rem" }} />
          </IconButton>
          ??????
        </Box>
        <Grid
          item
          xs={12}
          display="flex"
          pl={"5rem"}
          alignItems="center"
          justifyContent="center"
        >
          <JobTitleCard titleData={companyA[0]} />
          <Typography
            fontSize={"1rem"}
            sx={{ color: variables.Hover_Green, fontWeight: 600 }}
          >
            VS
          </Typography>
          <JobTitleCard titleData={companyB[0]} />
        </Grid>
      </Grid>

      <DividerTitle titleData={dividerData[0]} />

      <Grid container spacing={2} pl={"5rem"} justifyContent="center">
        <OthersCard data={companyA[1]} />
        <OthersCard data={companyB[1]} />
      </Grid>

      <DividerTitle titleData={dividerData[1]} />

      <Grid container spacing={2} pl={"5rem"} justifyContent="center">
        <OthersCard data={companyA[2]} />
        <OthersCard data={companyB[2]} />
      </Grid>

      <Grid
        container
        spacing={2}
        pl={"5rem"}
        display="flex"
        justifyContent="center"
        pt="2rem"
      >
        <ApplyCard URL={selectItemA ? selectItemA.URL_QUERY : ""}></ApplyCard>
        <ApplyCard URL={selectItemB ? selectItemB.URL_QUERY : ""}></ApplyCard>
      </Grid>
      <DividerTitle titleData={dividerData[2]} />

      <Box pl={"5rem"}>
        <Chart
          categoryA={selectItemA.CJOB_NAME1}
          categoryB={selectItemB.CJOB_NAME1}
        />
      </Box>
      <Footer />
    </Root>
  );
}
