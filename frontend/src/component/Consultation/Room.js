import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomId } = useParams();

  const Meeting = async (element) => {
    const appID = 1068428652;
    const serverSecret = "66f78c46f4f5483320d08c0114e1b97a";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Mohd Shuaib"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
      onReturnToHomeScreenClicked: () => window.location.replace("/"),
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://192.168.10.124:3000/room/${roomId}`,
        },
      ],
      scenario: {
        mode: "OneONoneCall",
        config: {
          role: "Host",
        },
      },
    });
  };

  return <div ref={Meeting} />;
};

export default Room;
