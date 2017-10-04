import firebase from '~/core/firebase/index';
import { getCurrentTime } from '~/core/helpers/index';

export function createPage({metaData: { template, slug, path, title }, pageData}) {
    return new Promise( (resolve, reject) => {

        if (!slug) {
            reject( new Error('No slug provided'))
        }
        else if (!template) {
            reject( new Error('No template provided'))
        }
        else if (!title) {
            reject( new Error('No title provided'))
        }

        const newPageId = firebase
            .database()
            .ref('/pageContent')
            .push()
            .key
        ;

        Promise.all([
            firebase
                .database()
                .ref(`/pageContent/${newPageId}`)
                .set(
                    _.assign(
                        {},
                        pageData,
                        {
                            id: newPageId,
                        },
                    )
                )
            , firebase
                .database()
                .ref(`/pages/${newPageId}`)
                .set({
                    lastModified: getCurrentTime(),
                    id: newPageId,
                    slug,
                    template,
                    title,
                    path: path || '/'
                })
        ])
            .then( () => resolve(newPageId))
            .catch( e => reject(e))

    })
}

export function updatePage({metaData: { slug, path, title, pageId }, pageData}) {
        return Promise.all([
            firebase
                .database()
                .ref(`/pageContent/${pageId}`)
                .update(
                    pageData
                )
            , firebase
                .database()
                .ref(`/pages/${pageId}`)
                .update({
                    lastModified: getCurrentTime(),
                    slug,
                    title,
                    path: path || '/'
                })
        ])
            .then( () => pageId)
            .catch( e => new Error(e))
}
