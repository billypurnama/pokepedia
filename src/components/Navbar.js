import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io5'
import { SideBar } from './constant/SideBar'
import { IconContext } from 'react-icons'

const navbar = css({
	backgroundColor: '#fa2d48',
	height: '80px',
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`
})

const sideBar = ({ sidebar }) => css`
	background-color: #fa2d48;
	width: 250px;
	height: 100vh;
	display: flex;
	justify-content: center;
	position: fixed;
	top: 0;
	left: -100%;
	transition: 850ms;
	z-index: 3;
	${sidebar && `
		left: 0;
		transition: 350ms;
	`}
`

const toggleButtonWrapper = css({
	width: '100%',
	height: '80px',
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
})

const toggleButton = css({
	marginLeft: '2rem',
	fontSize: '2rem',
	background: 'none',
	cursor: 'pointer',
})

const navbarMenuWrapper = css({
	width: '100%',
})

const navbarItem = css({
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	padding: '8px 0px 8px 16px',
	listStyle: 'none',
	height: '60px',
	'& a': {
		textDecoration: 'none',
		color: '#f5f5f5',
		fontSize: '18px',
		width: '95%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		padding: '0 16px',
		borderRadius: '4px',
	},
	'& a:hover': {
		backgroundColor: '#F87575'
	}
})

const navbarItemTitle = css({
	marginLeft: '16px',
})

function Navbar() {
	const [sidebar, setSideBar] = useState(false)

	const showSideBar = () => setSideBar(!sidebar)

	return (
		<>
			<IconContext.Provider value={{color: '#fff'}}>
				<div css={navbar}>
					<FaIcons.FaBars css={toggleButton} onClick={showSideBar} />
				</div>
				<nav css={sideBar({sidebar})}>
					<ul css={navbarMenuWrapper} onClick={showSideBar}>
						<li css={toggleButtonWrapper}>
							<IoIcons.IoCloseOutline css={toggleButton} />
						</li>
						{SideBar.map((item, index) => {
							return (
								<li key={index} css={navbarItem}>
									<Link to={item.path}>
										{ item.icon }
										<span css={navbarItemTitle}>{ item.title }</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	)
}

export default Navbar
