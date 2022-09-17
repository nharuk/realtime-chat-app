import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { ChannelList, Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer, Auth } from './components';
import './App.css'
import 'stream-chat-react/dist/css/index.css';

// const apiKey = 'd2eq7yyepbsn'
const apiKey = 'yvfah657jb3r'


const client = StreamChat.getInstance(apiKey)
const cookies = new Cookies();
const authToken = cookies.get("token");

if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth client={client}/>

  return (
    <div className='app__wrapper'>
        <Chat client={client} theme='team light'>
            <ChannelListContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />

            <ChannelContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
            />

        </Chat>

    </div>
  )
}

export default App