import ChatInfo from "./chatInfo";
import ChatView from "./chatView";
import ConvList from "./convList";

import './message.scss'

function Message() {
    return (<>
        <div className="message">
            <ConvList />
            <ChatView />
            <ChatInfo />
        </div>
    </>)
}

export default Message;