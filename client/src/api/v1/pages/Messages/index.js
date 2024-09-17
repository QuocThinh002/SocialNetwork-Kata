
import ChatView from "./chatView";
import ConvList from "./convList";

import './message.scss'

function Message() {
    return (<>
        <div className="message">
            <ConvList />
            <ChatView />
        </div>
    </>)
}

export default Message;