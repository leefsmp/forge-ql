const res = {
"statusCode": 200,
"headers": {
"content-type": "application/vnd.api+json",
"date": "Sun, 11 Mar 2018 17:04:24 GMT",
"referrer-policy": "origin-when-cross-origin",
"server": "forge-dm",
"x-content-type-options": "nosniff",
"x-frame-options": "DENY",
"x-request-id": "694a6a31-401a-4d9c-a061-b986d663b615",
"x-xss-protection": "1; mode=block",
"content-length": "3043",
"connection": "Close"
},
"body": {
"jsonapi": {
"version": "1.0"
},
"links": {
"self": {
"href": "https://developer.api.autodesk.com/project/v1/hubs"
}
},
"data": [
{
"type": "hubs",
"id": "a.YnVzaW5lc3M6bmV2aWxsZQ",
"attributes": {
"name": "Neville Johnson",
"extension": {
"type": "hubs:autodesk.core:Hub",
"version": "1.0",
"schema": {
"href": "https://developer.api.autodesk.com/schema/v1/versions/hubs:autodesk.core:Hub-1.0"
},
"data": {}
}
},
"links": {
"self": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.YnVzaW5lc3M6bmV2aWxsZQ"
}
},
"relationships": {
"projects": {
"links": {
"related": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.YnVzaW5lc3M6bmV2aWxsZQ/projects"
}
}
}
}
},
{
"type": "hubs",
"id": "a.YnVzaW5lc3M6YXV0b2Rlc2s2NTU",
"attributes": {
"name": "DevTech AEC",
"extension": {
"type": "hubs:autodesk.core:Hub",
"version": "1.0",
"schema": {
"href": "https://developer.api.autodesk.com/schema/v1/versions/hubs:autodesk.core:Hub-1.0"
},
"data": {}
}
},
"links": {
"self": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.YnVzaW5lc3M6YXV0b2Rlc2s2NTU"
}
},
"relationships": {
"projects": {
"links": {
"related": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.YnVzaW5lc3M6YXV0b2Rlc2s2NTU/projects"
}
}
}
}
},
{
"type": "hubs",
"id": "a.YnVzaW5lc3M6YXV0b2Rlc2t2cGM",
"attributes": {
"name": "Autodesk Visual Parts Catalog",
"extension": {
"type": "hubs:autodesk.core:Hub",
"version": "1.0",
"schema": {
"href": "https://developer.api.autodesk.com/schema/v1/versions/hubs:autodesk.core:Hub-1.0"
},
"data": {}
}
},
"links": {
"self": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.YnVzaW5lc3M6YXV0b2Rlc2t2cGM"
}
},
"relationships": {
"projects": {
"links": {
"related": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.YnVzaW5lc3M6YXV0b2Rlc2t2cGM/projects"
}
}
}
}
},
{
"type": "hubs",
"id": "a.cGVyc29uYWw6dWUyOWM4OWI3",
"attributes": {
"name": "Philippe Leefsma",
"extension": {
"type": "hubs:autodesk.a360:PersonalHub",
"version": "1.0",
"schema": {
"href": "https://developer.api.autodesk.com/schema/v1/versions/hubs:autodesk.a360:PersonalHub-1.0"
},
"data": {}
}
},
"links": {
"self": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.cGVyc29uYWw6dWUyOWM4OWI3"
}
},
"relationships": {
"projects": {
"links": {
"related": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/a.cGVyc29uYWw6dWUyOWM4OWI3/projects"
}
}
}
}
},
{
"type": "hubs",
"id": "b.a4f95080-84fe-4281-8d0a-bd8c885695e0",
"attributes": {
"name": "Autodesk Forge Partner Development",
"extension": {
"type": "hubs:autodesk.bim360:Account",
"version": "1.0",
"schema": {
"href": "https://developer.api.autodesk.com/schema/v1/versions/hubs:autodesk.bim360:Account-1.0"
},
"data": {}
}
},
"links": {
"self": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/b.a4f95080-84fe-4281-8d0a-bd8c885695e0"
}
},
"relationships": {
"projects": {
"links": {
"related": {
"href": "https://developer.api.autodesk.com/project/v1/hubs/b.a4f95080-84fe-4281-8d0a-bd8c885695e0/projects"
}
}
}
}
}
],
"meta": {
"warnings": [
{
"Id": null,
"HttpStatusCode": "403",
"ErrorCode": "BIM360DM_ERROR",
"Title": "Unable to get hubs from BIM360DM EMEA.",
"Detail": "You don't have permission to access this API",
"AboutLink": null,
"Source": [],
"meta": []
}
]
}
}
}

export default res