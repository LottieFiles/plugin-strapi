import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  MainNav, NavSection, NavSections, NavCondense, NavBrand, NavUser, NavLink,
  CarouselInput, CarouselSlide, CarouselImage, CarouselActions,
  ModalHeader, ModalLayout, ModalBody, Grid, GridItem, Divider, Flex,
  Searchbar, SearchForm, TwoColsLayout, ModalFooter,
  BaseButton, IconButton, Box, Avatar, Typography, Stack, NavFooter
} from '@strapi/design-system';
import { Cog, Information, Landscape, Layer, Pencil, Play, Plus, Puzzle, ShoppingCart, Trash, Write } from "@strapi/icons";
import { useIntl } from "react-intl";
// @ts-ignore
import { Link } from '@strapi/design-system/v2';
import getTrad from "../../utils/getTrad";
import LottieAnimation from "./LottieAnimation";
// @ts-ignore
import { Loader } from "@strapi/design-system/Loader";
import { FeaturedQuery, PopularQuery, RecentQuery, SearchQuery, CreateLoginToken, TokenLogin } from "../../utils/queries";
import { fetchQuery, fetchMutation } from "../../utils/api";
import { useDebounce } from "use-debounce";
import Banner from "../Banner";
import { Player } from "@lottiefiles/react-lottie-player";
import LottieLoading from "../Lottie-loading.json";

const LottieInputDialogue = ({ setIsVisible, handleSelect }) => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState('');
  const [condensed, setCondensed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animations, setAnimations] = useState([]);
  const [pageInfo, setPageInfo] = useState({} as any);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState(RecentQuery);
  const [queryName, setQueryName] = useState("recentPublicAnimations");
  const [after, setAfter] = useState("");
  const [befor, setBefor] = useState("");
  const [first, setFirst] = useState(20);
  const [last, setLast] = useState(0);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useDebounce(search, 1000);
  const [params, setParams] = useState({ after, first, last })
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");


  const openUrl = (url: string) => {
    const elem = document.createElement("a");
    elem.setAttribute("href", url);
    elem.setAttribute("target", "_blank");
    elem.click();
    elem.remove();
  }

  const login = async () => {
    setIsLoggingIn(true)
    // setAuth({});

    fetchMutation(CreateLoginToken, { appKey: "strapi-plugin" }).then(async (result: any) => {
      if (result.data.createLoginToken) {
        openUrl(result.data.createLoginToken.loginUrl);
        await pollLoginComplete(result.data.createLoginToken.token, new Date());
      }

    }).catch((err) => {
      console.log("err", err)
    })

    // createLoginToken({ appKey: "figma-plugin" }).then(async (result) => {

    // });
  }

  const pollLoginComplete = async (token, pollStartTime) => {
    fetchMutation(TokenLogin, { token: token }).then(async (result: any) => {
      if (!result.data) {
        console.log("!result.data")
        const currentTime = new Date();
        if ((currentTime.getTime() - pollStartTime.getTime()) / 1000 / 60 < 10) {
          console.log("< 60")

          setTimeout(() => pollLoginComplete(token, pollStartTime), 2000);
        } else {
          console.log("> 60")

          setIsLoggingIn(false);
        }
      } else {
        console.log("result data")

        let accessToken = result.data.tokenLogin.accessToken;
        setAccessToken(accessToken);
        setIsLoggingIn(false);

      }
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let queryResponse;
      if (searchTerm) {
        if (search !== "") {
          setQuery(SearchQuery);
          setQueryName("searchPublicAnimations");
          queryResponse = await fetchQuery(query, { ...params, query: search });
        }
      } else {
        queryResponse = await fetchQuery(query, params);
      }

      if (queryResponse?.data && queryResponse?.data[queryName].edges) {
        setAnimations(queryResponse.data[queryName].edges);
        setPageInfo(queryResponse.data[queryName].pageInfo)
      }
      setLoading(false);
    }
    fetchData();
  }, [queryName, searchTerm, params]);

  return (
    <ModalLayout
      style={{ minWidth: "1200px", width: "auto" }}
      onClose={() => setIsVisible(false)}
      labelledBy="title"
    >
      <ModalHeader>
        <svg
          className="lf-ml-1.5"
          width="185"
          height="30"
          viewBox="0 0 185 36"
          fill="none"
        >
          <g clipPath="url(#clip0_3_59086)">
            <path
              d="M144.39 12.6858H140.021V28.0432H144.39V12.6858Z"
              fill="black"
            ></path>
            <path
              d="M144.39 7.62427H140.021V11.02H144.39V7.62427Z"
              fill="black"
            ></path>
            <path
              d="M49.0975 7.62427H44.5303V28.0432H58.4764V24.1284H49.0975V7.62427Z"
              fill="black"
            ></path>
            <path
              d="M67.5022 11.408C62.6409 11.408 58.793 15.1596 58.793 19.8874C58.793 24.6152 62.6409 28.3767 67.5022 28.3767C72.3635 28.3767 76.2437 24.6251 76.2437 19.8948C76.2437 15.1645 72.3932 11.408 67.5022 11.408ZM67.5022 24.3236C65.0555 24.3236 63.2291 22.4651 63.2291 19.875C63.2291 17.285 65.0555 15.4413 67.5022 15.4413C69.9489 15.4413 71.7753 17.3319 71.7753 19.875C71.7753 22.4181 69.9489 24.3236 67.5022 24.3236Z"
              fill="black"
            ></path>
            <path
              d="M94.5692 24.5857C93.7858 24.5857 93.1012 24.1285 93.1012 22.7272V16.2051H97.268V12.6858H93.1012V8.25952H88.7317V12.6858H82.9931V8.25952H78.6236V12.6858H76.2437V16.2051H78.6236V22.7915C78.6236 26.4764 80.3858 28.3695 83.6456 28.3695C85.1176 28.3724 86.5579 27.9427 87.7877 27.1338L86.5519 23.9061C85.9332 24.3244 85.2098 24.5615 84.4635 24.5907C83.6801 24.5907 82.9955 24.1335 82.9955 22.7322V16.2051H88.7342V22.7915C88.7342 26.4764 90.4938 28.3695 93.7561 28.3695C95.228 28.3719 96.6683 27.9423 97.8983 27.1338L96.6626 23.9061C96.0422 24.3241 95.3169 24.5596 94.5692 24.5857Z"
              fill="black"
            ></path>
            <path
              d="M122.195 18.7382C121.528 14.1537 117.531 10.9112 113.14 11.5513C112.035 11.7021 110.972 12.0719 110.012 12.639C109.053 13.2061 108.216 13.9591 107.551 14.8539C106.886 15.7486 106.407 16.7671 106.141 17.8496C105.875 18.9321 105.828 20.0568 106.002 21.1578C106.776 26.4837 111.355 28.9502 116.066 28.2631C118.199 27.9632 120.197 27.0427 121.812 25.6162L119.746 22.7518C118.566 23.7712 117.118 24.4286 115.574 24.6449C113.444 24.9539 111.449 24.1507 110.609 22.0055L122.323 20.3002C122.309 19.7776 122.267 19.2561 122.195 18.7382ZM110.124 19.1411C110.248 17.0478 111.667 15.4562 113.537 15.1868C114.488 15.039 115.46 15.2428 116.271 15.7601C117.082 16.2773 117.677 17.0726 117.944 17.9968L110.124 19.1411Z"
              fill="black"
            ></path>
            <path
              d="M169.629 18.7382C168.961 14.1537 164.963 10.9112 160.574 11.5513C159.469 11.7018 158.405 12.0714 157.446 12.6384C156.486 13.2054 155.649 13.9584 154.984 14.8532C154.319 15.7481 153.84 16.7667 153.574 17.8493C153.308 18.9319 153.261 20.0568 153.436 21.1578C154.21 26.4837 158.787 28.9502 163.5 28.2631C165.632 27.9632 167.63 27.0427 169.243 25.6162L167.18 22.7518C165.999 23.7713 164.55 24.4286 163.005 24.6449C160.875 24.9539 158.881 24.1507 158.04 22.0055L169.757 20.3002C169.742 19.7776 169.699 19.2563 169.629 18.7382ZM157.558 19.1411C157.682 17.0478 159.098 15.4562 160.971 15.1868C161.921 15.0383 162.892 15.242 163.702 15.7595C164.511 16.2771 165.104 17.0728 165.368 17.9968L157.558 19.1411Z"
              fill="black"
            ></path>
            <path
              d="M151.565 7.62427H147.195V28.0407H151.565V7.62427Z"
              fill="black"
            ></path>
            <path
              d="M178.677 17.8336C177.177 17.5074 175.807 17.2133 175.807 16.3013C175.807 15.6167 176.754 15.1595 177.765 15.1595C179.344 15.1846 180.895 15.5754 182.297 16.3013L183.765 13.0391C181.942 11.9235 179.835 11.3572 177.698 11.4079C174.633 11.4079 171.371 13.17 171.371 16.4966C171.371 19.6279 174.013 20.698 177.243 21.5506C178.645 21.9436 180.048 22.171 180.048 23.1496C180.048 24.1283 178.385 24.5188 177.372 24.5188C175.526 24.5548 173.726 23.9426 172.286 22.7888L170.719 26.1524C171.633 27.0001 173.882 28.3767 177.372 28.3767C180.407 28.3767 184.482 27.0397 184.482 23.0261C184.482 19.6921 181.46 18.491 178.677 17.8336Z"
              fill="black"
            ></path>
            <path
              d="M104.025 12.6858H99.6553V28.0432H104.025V12.6858Z"
              fill="black"
            ></path>
            <path
              d="M104.025 7.62427H99.6553V11.02H104.025V7.62427Z"
              fill="black"
            ></path>
            <path
              d="M124.056 28.0432H128.613V19.6996H136.341V15.8269H128.613V11.5316H138.002V7.62427H124.056V28.0432Z"
              fill="black"
            ></path>
            <path
              d="M26.8866 0H9.10722C4.07746 0 0 4.07743 0 9.1072V26.8866C0 31.9164 4.07746 35.9938 9.10722 35.9938H26.8866C31.9164 35.9938 35.9939 31.9164 35.9939 26.8866V9.1072C35.9939 4.07743 31.9164 0 26.8866 0Z"
              fill="#00DDB3"
            ></path>
            <path
              d="M27.356 8.06177C21.1601 8.06177 18.8641 12.4856 17.018 16.0395L15.8119 18.3132C13.857 22.0822 12.3965 24.3732 8.6325 24.3732C8.39882 24.3732 8.16742 24.4192 7.95153 24.5086C7.73564 24.598 7.53946 24.7291 7.37422 24.8943C7.20899 25.0596 7.07785 25.2558 6.98842 25.4716C6.899 25.6875 6.85303 25.9189 6.85303 26.1526C6.85368 26.6243 7.04138 27.0766 7.37495 27.4101C7.70851 27.7437 8.16077 27.9314 8.6325 27.932C14.8308 27.932 17.1267 23.5082 18.9729 19.9543L20.1765 17.6805C22.1339 13.9116 23.5944 11.6206 27.356 11.6206C27.5898 11.6209 27.8215 11.5752 28.0376 11.4859C28.2538 11.3966 28.4503 11.2656 28.6158 11.1003C28.7813 10.9351 28.9126 10.7388 29.0022 10.5227C29.0918 10.3067 29.1378 10.0751 29.1378 9.8412C29.1372 9.36904 28.9492 8.91644 28.6151 8.5828C28.281 8.24917 27.8281 8.06177 27.356 8.06177Z"
              fill="white"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_3_59086">
              <rect width="184.5" height="36" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </ModalHeader>
      {
        accessToken ? <>
          <ModalBody style={{ minHeight: "600px", height: "100%", padding: "unset" }}>

            <Flex style={{}}>
              <Box style={{}}>
                <MainNav condensed={condensed} style={{ minHeight: "600px", height: "100%" }}>
                  <NavSections>
                    <Searchbar name="search" onClear={() => setSearch('')} value={search} onChange={(e: any) => {
                      e.preventDefault();
                      setSearch(e.target.value);
                    }} clearLabel="Clearing search" placeholder="search">
                      Searching for a plugin
                    </Searchbar>

                    <Button fullWidth variant='tertiary'
                      style={queryName === "recentPublicAnimations" ? { background: "#F6F8F9", } : {}}
                      onClick={() => {
                        setSearch("");
                        setQuery(RecentQuery);
                        setQueryName("recentPublicAnimations");
                      }}>
                      <span style={queryName === "recentPublicAnimations" ? { color: "#00C1A3" } : {}}>Recent</span>
                    </Button>

                    <Button fullWidth variant='tertiary'
                      style={queryName === "featuredPublicAnimations" ? { background: "#F6F8F9", } : {}}
                      onClick={() => {
                        setSearch("");
                        setQuery(FeaturedQuery);
                        setQueryName("featuredPublicAnimations");
                      }}>
                      <span style={queryName === "featuredPublicAnimations" ? { color: "#00C1A3" } : {}}>Featured</span>
                    </Button>

                    <Button fullWidth variant='tertiary'
                      style={queryName === "popularPublicAnimations" ? { background: "#F6F8F9", } : {}}
                      onClick={() => {
                        setSearch("");
                        setQuery(PopularQuery);
                        setQueryName("popularPublicAnimations");
                      }}>
                      <span style={queryName === "popularPublicAnimations" ? { color: "#00C1A3" } : {}}>Popular</span>

                    </Button>

                  </NavSections>
                </MainNav>

              </Box>

              <Box style={{ width: "100%", height: "600px", overflow: "auto" }}>

                {loading ? (
                  <Loader style={{ margin: "auto", textAlign: "center" }}>Loading content...</Loader>
                ) : (
                  <Grid gap={2}>
                    {animations.map((animation: any) => {
                      return (
                        <LottieAnimation
                          key={animation.node.id}
                          animation={animation.node}
                          setSelected={setSelected} />
                      );
                    })}
                  </Grid>
                )}
              </Box>
            </Flex>

          </ModalBody><ModalFooter
            startActions={
              <>
                <Button onClick={() => setIsVisible((prev) => !prev)} variant="tertiary">Cancel</Button>
                <Button onClick={() => {
                  handleSelect(selected);
                  setIsVisible((prev) => !prev);
                }}>Finish</Button>
              </>
            }
            endActions={
              <>
                <Button variant="secondary" onClick={() => { setParams({ after: "", before: pageInfo.startCursor, first: 0, last: 20 } as any); }}>Previous</Button>
                <Button variant="secondary" onClick={() => { setParams({ after: pageInfo.endCursor, first: 20, before: "", last: 0 } as any); }}>Next</Button>

              </>
            } />
        </> :
          <>
            {
              isLoggingIn ?
                <Box style={{ display: "block", paddingTop: "15%", textAlign: "center", minHeight: "600px", height: "100%", margin: "auto", }}>
                  <Player
                    src={JSON.stringify(LottieLoading)}
                    autoplay={true}
                    loop={true}
                    style={{ height: "100px", width: "100px", }}
                  />
                </Box> : <>
                  <Box style={{ display: "block", textAlign: "center", maxWidth: "512px", margin: "auto", }}>
                    <Typography style={{ display: "block", }} variant="alpha">Bring your web pages to life with
                      Lottie animations</Typography>

                    <Typography style={{ display: "block", }} variant="beta">Log in with your LottieFiles account to access
                      the world’s largest collection of free-to-use animations on your website.</Typography>

                    <Button style={{ margin: "auto", }} onClick={() => login()}
                      variant='default'>Log in with your LottieFiles account</Button>

                    <Typography style={{ display: "block", }} variant="epsilon">Don’t have an account yet?</Typography>

                    <Link isExternal href="https://strapi.io/">
                      External link
                    </Link>
                  </Box>

                  <Box style={{ display: "block", textAlign: "center", margin: "auto", marginTop: "50px" }}>
                    <Banner />
                  </Box>
                </>
            }

          </>
      }
    </ModalLayout >
  )

}

export default LottieInputDialogue
