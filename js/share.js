function kakaoShare(image, url) {
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '카카오 도서 검색 Open API',
            imageUrl:
                'image',
            link: {
                mobileWebUrl: '',
                androidExecutionParams: 'test',
            },
        },
        buttons: [
            {
                title: '웹으로 이동',
                link: {
                    mobileWebUrl: '',
                },
            }
        ]
    });
}
