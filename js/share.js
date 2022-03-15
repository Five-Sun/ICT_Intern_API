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
                webUrl:shareUrl 
            },
        },
        buttons: [
            {
                title: '책 정보 보기',
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl
                },
            }
        ]
    });
}
