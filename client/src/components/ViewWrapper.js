import ListCardWrapper from "./ListCardWrapper";
import NavigationBar from "./NavigationBar";
import PlayerCommentWrapper from "./PlayerCommentWrapper";
import StatusBar from "./StatusBar";

export default function ViewWrapper() {
    return (
        <div id='playlist-view'>
            <NavigationBar />
            <div id='playlist-view-content'>
                <ListCardWrapper />
                <PlayerCommentWrapper />
            </div>
            <StatusBar />
        </div>
    );
}