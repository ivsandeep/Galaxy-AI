import React from 'react'
import { Link } from 'react-router-dom'
import "./ChatList.css"
import { useQuery } from '@tanstack/react-query'
const ChatList = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () =>
      fetch('http://localhost:5000/api/userchats',{
        credentials:"include",
      }).then((res) =>
        res.json(),
      ),
  })



  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to='/dashboard'>Create a new chat</Link>
      <Link to='/'>Explore GALAXY AI</Link>
      <Link to='/'>Contacts</Link>
      <hr></hr>
      <span className='title'>RECENT CHATS</span>
      <div className='list'>
        {isPending ? "Loading..." : error ? "Something went wrong" : data?.map(chat => (
          <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>{chat.title}</Link>
        ))}
      </div>
      <hr />
      <div className='upgrade'>
        <img src='/logo.png' alt=''></img>
        <div className='texts'>
          <span>Upgrade to Gemini AI Pro</span>
        </div>
      </div>
    </div>
  )
}

export default ChatList