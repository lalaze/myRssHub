const got = require('@/utils/got');

module.exports = async (ctx) => {
    const response = await got.post('https://api.500px.com/graphql', {
        json: {
            operationName: 'DiscoverQueryRendererQuery',
            variables: {
                filters: [
                    {
                        key: 'FEATURE_NAME',
                        value: 'popular',
                    },
                    {
                        key: 'FOLLOWERS_COUNT',
                        value: 'gte:0',
                    },
                ],
                sort: 'POPULAR_PULSE',
            },
            query: 'query DiscoverQueryRendererQuery($filters: [PhotoDiscoverSearchFilter!], $sort: PhotoDiscoverSort) {\n  ...DiscoverPaginationContainer_query_1OEZSy\n}\n\nfragment DiscoverPaginationContainer_query_1OEZSy on Query {\n  photos: photoDiscoverSearch(first: 50, filters: $filters, sort: $sort) {\n    edges {\n      node {\n        id\n        legacyId\n        canonicalPath\n        name\n        description\n        category\n        uploadedAt\n        location\n        width\n        height\n        isLikedByMe\n        notSafeForWork\n        tags\n        photographer: uploader {\n          id\n          legacyId\n          username\n          displayName\n          canonicalPath\n          avatar {\n            images {\n              url\n              id\n            }\n            id\n          }\n          followedBy {\n            totalCount\n            isFollowedByMe\n          }\n        }\n        images(sizes: [33, 35]) {\n          size\n          url\n          jpegUrl\n          webpUrl\n          id\n        }\n        pulse {\n          highest\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
        },
    });

    const data = response.data.data.photos.edges;

    ctx.state.data = {
        // 源标题
        title: `500px popular 图片`,
        link: `https://500px.com/popular`,
        // 遍历此前获取的数据
        item: data.map((item) => ({
            // 文章标题
            title: item.node.name,
            // 文章正文
            description: `<img src="${item.node.images[0].url}">`,
            // 文章发布时间
            pubDate: new Date(item.time * 1000).toUTCString(),
            // 文章链接
            link: `https://500px.com/${item.node.canonicalPath}`,
        })),
    };
};
