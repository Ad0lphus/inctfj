import React from 'react';
import styled from '@emotion/styled';
import Discord from '../../../assets/images/chatbot/Discord.svg';
import Facebook from '../../../assets/images/chatbot/Facebook.svg';
import Email from '../../../assets/images/chatbot/Email.svg';

const Tab = styled.div`
  background-color: white;
  border: 2px solid #ff6f00;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin: 3px 0px;
  font-size: 0.9rem;
  height: 50px;
`;

const Link = styled.a`
`;

const Image = styled.img`
height: 100%;
width: 100%;
`;

const Social = () => {

    const options = [
        {
            id: 1,
            text: "Discord",
            icon: Discord,
            link:"https://discord.com/invite/QVXewGh7sP",
        },
        {
            id: 2,
            icon: Facebook,
            link: "https://www.facebook.com/InCTFj",
        },
        {
            id: 3,
            icon: Email,
            link: "mailto:inctfj@am.amrita.edu."
        }
    ]

    const optionsMarkup = options.map((option) => (
        <Tab key={option.key}>
            <Link href={option.link}>
                <Image src={option.icon}/>
            </Link>
        </Tab>
    ))


    return (
        <div>{optionsMarkup}</div>
    )
}

export default Social;
