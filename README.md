- Resources
    - \_admin
        - This will be the url for the CMS
    - dynamicRoutes
        - This is how the core project will be served

- Schema
    - pages
        - [pageId]
            - id
            - published
            - lastModified
            - template
            - path
                - /test
            - slug
                - wow-test-this
            - title
                - hello
    - templates
        - [templateId]
            - hasUrl
                - true/false
            - fields
                - field1
                    - id
                    - type
    - pageContent
        - [pageId]

    - versions
        - [versionId]
            - id
            - pageId
            - content
                - hello
            - date
                - wow
            - one
                - ok
