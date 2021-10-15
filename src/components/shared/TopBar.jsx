import React, { useState, useEffect, useRef } from 'react';
import styled from "@emotion/styled";
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import Modal from "react-modal";
import Link from "next/link";

import SideBar from "./SideBar";
import TopBarItem from "./TopBarItem";
import dynamic from "next/dynamic";

const SearchBar = dynamic(() => import("../landing/search/SearchBar"), { ssr: false });

const TopbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 6000;
  background: transparent;
  border-bottom: 2px solid transparent;
  box-shadow: none;
  transition: all 300ms ease-in-out;
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  padding: 1rem 0.35rem;
  
  &.floating {
    background: white;
    box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.35);
    border-bottom: 2px solid #FF6F00;
  }
  
  &.up, &.top {
    pointer-events: auto;
    transform: none;
    opacity: 1;
  }
  
  &.top {
    margin-top: 53px;
  }
  
  @media screen and (max-width: 768px) {
    border-top: 2px solid #FF6F00;
    border-bottom: none !important;
    background: white;
    top: initial;
    bottom: 0;
    transform: translateY(100%);
  }

  nav {
    a {
      font-size: 17px;
      color: #222;
      padding: 8px 12px;
      text-decoration: none !important;
      transition: color 250ms ease;

      &:hover {
        color: #fd7e14;
      }
    }
  }

  .logo {
    max-height: 56px;
  }

  img {
    max-height: 32px;
    max-width: 100%;
  }
`;


const TopbarInfoCard = styled.div`
  color: #222;
  line-height: 1.3;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CloseButton = styled.button`
  background: none !important;
  top: 1rem;
  right: 1rem;
  position: absolute;
  padding: 0 !important;

  img {
    width: 32px;
  }
`;

const TopBar = ({ darkenOnSidebar = false, UTMSource = null }) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showRegCard, setShowRegCard] = useState(false);
    const [scrollDir, setScrollDir] = useState('up');
    const [isAtTop, setIsAtTop] = useState(true);
    const [searchModal, setSearchModal] = useState(false);

    const topbarRef = useRef()
    const scrollPrevStateRef = useRef(0);

    const onOpen = () => {
        setShowMenu(!showMenu);
    };

    const onClose = () => {
        setShowMenu(false);
    };

    const onScroll = () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        st = st <= 0 ? 0 : st;

        setScrollDir(st > 83 && st > scrollPrevStateRef.current ? 'down' : 'up');
        setIsAtTop(st <= 83);
        scrollPrevStateRef.current = st;
    }

    useEffect(() => {
        document.addEventListener('scroll', onScroll, false);
        return () => {
            document.removeEventListener('scroll', onScroll, false);
        }
    }, []);

    const TopbarItems = [
        {
            "label": "About",
            "link": "/about",
            items: [
                {
                    "label": "What's India CTF Jr?",
                    "link": "/about#what"
                },
                {
                    "label": "Why InCTF Jr?",
                    "link": "/about#why"
                },
                {
                    "label": "Our Reach & Statistics",
                    "link": "/about#our-reach"
                },
                {
                    "label": "Organizing Team",
                    "link": "/organizers"
                },
                {
                    "label": "Advisory Board",
                    "link": "/advisory-board"
                },
                {
                    "label": "Sponsors",
                    "link": "/sponsors"
                }
            ]
        },
        {
            "label": "Talent Incubation",
            "link": "/talent-incubation",
            "items": [
                {
                    "label": "The CTF Pedagogy",
                    "link": "/talent-incubation#pedagogy"
                },
                {
                    "label": "CyberSafety Education",
                    "link": "/talent-incubation#programmes"
                },
                {
                    "label": "Indian Cyber League",
                    "link": "/talent-incubation#indian-cyber-league"
                },
                {
                    "label": "Diversity Initiatives",
                    "link": "/talent-incubation#diversity"
                },
                {
                    "label": "Success Stories",
                    "link": "/about#impact"
                }
            ]
        },
        {
            "label": "Championship",
            "link": "/championship",
            "items": [
                {
                    "label": "Why Participate?",
                    "link": "/championship#why-participate",
                },
                {
                    "label": "Contest Timeline",
                    "link": "/championship#timeline",
                },
                {
                    "label": "Guidelines & Rules",
                    "link": "/rules",
                },
                {
                    "label": "Prizes",
                    badge: "3 Lks+",
                    badgeColor: "bg-green-100",
                    "link": "championship/#prizes",
                },
                {
                    "label": "Past Winners",
                    "link": "/stats",
                }
            ]
        },
        {
            "label": "Get Started",
            "link": "/resources",
            items: [
                {
                    "label": "Cyber Workshops",
                    "badge": "free",
                    "link": "/trainings"
                },
                {
                    "label": "Videos & Guides",
                    "link": "/resources"
                },
                {
                    "label": "FAQ",
                    badge: "get answers",
                    "link": "/faq",
                },
                {
                    "label": "bi0s Wiki",
                    "link": "https://wiki.bi0s.in/"
                },
                {
                    "label": "Practice Challenges",
                    "link": "https://app.traboda.com/"
                },
                {
                    "label": "Writeups",
                    badge: "new",
                    badgeColor: "bg-yellow-100",
                    "link": "/writeups"
                },
                {
                    "label": "Promote InCTF",
                    "link": "/promote"
                },
                {
                    "label": "Get Help",
                    "badge": "discord",
                    badgeColor: "bg-blue-100",
                    "link": "/discord"
                }
            ]
        },
    ]

    const isVisible = () => scrollDir === 'up' || isAtTop;

    useEffect(() => {
        setShowMenu(false);
    }, [scrollDir]);

    return <div>
        <div style={{ fontSize: '14px' }} className="hidden md:block p-2 bg-blue-800 text-white">
            <div className="flex flex-wrap items-center">
                <div className="md:w-4/5 px-3">
                    Have you got stuck? Need Help? <wbr />
                    <span className="inline-block">
                        Join our discord server, ask your doubts & get support from our experts.
                    </span>
                </div>
                <div className="md:w-1/5 flex items-center md:my-0 px-2 md:px-0 justify-end">
                    <Link href="/discord" passHref>
                        <a className="bg-white text-blue-800 mb-0 hover:text-primary rounded-lg px-3 py-2">
                            Join Discord Now <i className="fa fa-chevron-right ml-1" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
        <TopbarContainer ref={topbarRef} className={scrollDir + ` ${isAtTop ? 'top' : 'floating'}`}>
            <div className="topbar-container">
                <div className="mx-0 w-full px-0">
                    <div className="flex flex-wrap w-full mx-0">
                        <div
                            className="w-1/4 md:w-1/6 md:text-center flex items-center md:justify-end justify-center px-2"
                        >
                            <Link href="/" passHref>
                                <a>
                                    <img
                                        className="logo"
                                        src={require('../../assets/images/logos/inctf.png')}
                                        alt="InCTF Jr"
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="md:w-5/6 px-1 hidden md:flex items-center">
                            <div className="flex flex-wrap  mx-0 w-full">
                                <div className="md:w-3/4 xl:w-1/2 pr-4 pl-4 flex items-center px-1">
                                    <nav className="flex items-center">
                                        {TopbarItems?.map((i) => (
                                            <TopBarItem item={i} isVisible={isVisible()} />
                                        ))}
                                        <button
                                            className="fas fa-search justify-center text-lg text-black hover:text-primary ml-2"
                                            onClick={() => {
                                                disableBodyScroll(document.body);
                                                setSearchModal(true);
                                            }}
                                        />
                                    </nav>
                                </div>
                                <div className="md:w-1/4 xl:w-1/2 pr-4 pl-4 flex justify-end text-right px-1">
                                    <TopbarInfoCard className="items-center flex">
                                        <div className="hidden xl:inline-block mr-2">
                                            <div>India's First & Only CTF Championship</div>
                                            <h5 style={{ color: '#F13F17' }} className="mb-0">Exclusively for School Students</h5>
                                        </div>
                                        <button
                                            className="px-8 py-4 rounded-lg font-semibold bg-primary hover:bg-blue-800 shadow hover:shadow-xl text-white ml-3"
                                            onClick={() => setShowRegCard(true)}
                                        >
                                            Register <i className="fa fa-chevron-right" />
                                        </button>
                                    </TopbarInfoCard>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/4 flex md:hidden items-center justify-end px-1">
                            <TopbarInfoCard className="mr-3">
                                <button
                                    onClick={() => setShowRegCard(true)}
                                    className="w-full px-5 py-4 font-semibold rounded-lg bg-primary text-white hover:bg-blue-800 shadow hover:shadow-xl ml-3"
                                >
                                    Register <i className="fa fa-chevron-right" />
                                </button>
                            </TopbarInfoCard>
                            <button onClick={onOpen} className="transition" style={{ width: 46, height: 46 }}>
                                <i className={`${showMenu ? 'fa fa-times' : 'fa fa-bars'} text-2xl transition`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </TopbarContainer>
        <Modal
            isOpen={showRegCard}
            onRequestClose={() => {
                clearAllBodyScrollLocks();
                setShowRegCard(false);
            }}
            style={{
                overlay: {
                    zIndex: 9000, background: 'rgba(0,0,0,0.5)',
                    height: '100vh', width: '100%',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'right',
                },
                content: {
                    position: 'unset', top: 0, left: 0, right: 0, padding: 0,
                    border: 'none', background: 'none', width: '500px', maxWidth: '100vw'
                }
            }}
        >
            <CloseButton
                className="px-4 border-0 rounded"
                onClick={() => {
                    clearAllBodyScrollLocks();
                    setShowRegCard(false)
                }}
            >
                <img alt="close" src={require('../../assets/images/icons/close.png')}/>
            </CloseButton>
            {showRegCard &&
            <div className="flex bg-white px-3 md:p-4 py-6 items-end rounded-t-2xl md:rounded-r-none md:rounded-bl-2xl justify-center">
                <iframe
                    className="border-0"
                    style={{ width: '500px', maxWidth: '100vw', height: '190px', overflow: 'auto' }}
                    src={`https://app.traboda.com/contest/inctfj-21-lr/reg-frame?color=000&primary=F13F17&primary_text=fff${UTMSource ? `&utm_source=${UTMSource}` : ''}`}
                />
            </div>}
        </Modal>
        <Modal
            isOpen={searchModal}
            onRequestClose={() => {
                clearAllBodyScrollLocks();
                setSearchModal(false);
            }}
            style={{
                overlay: {
                    zIndex: 9000,
                    height: '100vh',
                    width: '100vw',
                    padding: 0
                },
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: 'none',
                    borderRadius: 0,
                    inset: 0,
                    height: '100vh',
                    width: '100vw',
                    background: 'white'
                }
            }}
        >
            <button
                className="fas fa-times text-xl absolute top-0 text-light hover:text-primary right-0 mt-4 mr-4 cursor-pointer"
                onClick={() => {
                    clearAllBodyScrollLocks();
                    setSearchModal(false);
                }}
            />
            <div style={{ padding: '5vh 1rem 15vh 1rem' }} className="container mx-auto flex flex-col items-center justify-center">
                <div className="text-center w-full" style={{ maxWidth: 600 }}>
                    <Link href="/" passHref>
                        <a>
                            <img
                                className="mb-8 inline"
                                src={require('../../assets/images/logos/inctf.png')}
                                alt="InCTF Jr"
                                style={{ maxHeight: '120px' }}
                            />
                        </a>
                    </Link>
                    <SearchBar
                        placeholder="Search your queries & questions about InCTF Jr"
                        isFocused
                    />
                </div>
            </div>
        </Modal>
        {isVisible() && showMenu &&
        <SideBar
            darkenOnSidebar={darkenOnSidebar}
            onClose={onClose}
        />}
        <div style={{ height: topbarRef ? topbarRef?.current?.offsetHeight : '72px' }} className="hidden md:block"/>
        <div className="block md:hidden text-center pt-6 px-2 pb-4">
            <Link passHref href="/">
                <a>
                    <img
                        alt="InCTF Jr"
                        style={{ height: '72px' }}
                        className="inline"
                        src={require('../../assets/images/branding/colorful.png')}
                    />
                </a>
            </Link>
        </div>
    </div>

};

export default TopBar;