function kakaoShare(data) {

    const shareImage = data.thumbnail;
    const shareTitle = data.title;
    const shareDes = data.contents;
    const shareUrl = data.url;

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: shareTitle,
            description: shareDes,
            imageUrl: shareImage,
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
            },
        },
        buttons: [
            {
                title: '책 정보 보기',
                link: {
                    mobileWebUrl: shareUrl,
                   webUrl: shareUrl
                },
            },
        ]
    });
}; //카카오톡 공유하기 API 내용에 맞게 매개변수로 해당 정보의 객체를 받아 내용물로 지정
