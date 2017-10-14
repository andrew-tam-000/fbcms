import _ from 'lodash';
import firebase from '~/core/firebase/index';
import { getCurrentTime } from '~/core/helpers/index';

async function getTemplateFromPageId(pageId) {
    const snapshot = await firebase
        .database()
        .ref(`/pages/${pageId}/template`)
        .once('value')
    ;

    return snapshot.val();
}

async function templateHasUrl(template) {
    const snapshot = await firebase
        .database()
        .ref(`/templates/${template}/hasUrl`)
        .once('value')
    ;

    return snapshot.val();
}

function getNewKeyForRef(ref) {
    return firebase
        .database()
        .ref(ref)
        .push()
        .key
    ;
}

async function setData(ref, data) {
    return firebase
        .database()
        .ref(ref)
        .set(
            data
        )
    ;
}

export async function createPage({metaData: { template, slug, path, title }, pageData}) {

    const mustHaveSlug = await templateHasUrl(template);

    if ( mustHaveSlug && !slug) {
        throw new Error('No slug provided');
    }
    else if (!template) {
        throw new Error('No template provided');
    }
    else if (!title) {
        throw new Error('No title provided');
    }

    const newPageId = getNewKeyForRef('/pageContent');

    try {
        await Promise.all([
            setData(
                `/pageContent/${newPageId}`,
                _.assign(
                    {},
                    pageData,
                    {
                        id: newPageId,
                    },
                )
            ),
            setData(
                `/pages/${newPageId}`,
                _.assign(
                    {
                        lastModified: getCurrentTime(),
                        id: newPageId,
                        template,
                        title,
                    },
                    mustHaveSlug ? (
                        {
                            slug,
                            path: path || '/'
                        }
                    ) : (
                        {}
                    )
                )
            )
        ]);
        return newPageId;
    }
    catch (e) {
        throw e;
    }

}

export async function updatePage({metaData: { slug, path, title, pageId }, pageData}) {

    const mustHaveSlug = await templateHasUrl(
        await getTemplateFromPageId(pageId)
    );

    if ( mustHaveSlug && !slug) {
        throw new Error('No slug provided');
    }
    else if (!title) {
        throw new Error('No title provided');
    }

    console.debug('Updating page', pageData)

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
            .update(
                _.assign(
                    {
                        lastModified: getCurrentTime(),
                        title,
                    },
                    mustHaveSlug ? (
                        {
                            slug,
                            path: path || '/'
                        }
                    ) : (
                        {}
                    )
                )
            )
    ])
        .then( () => pageId)
        .catch( e => new Error(e))
}

function generateImageRefUrl(fileObj) {
    const fileName = _.get(fileObj, 'name');
    const path = `images/${fileName}`
    return path;
}

export async function uploadImage(fileObj) {
    const storageRef = firebase.storage().ref();
    const path = generateImageRefUrl(fileObj);
    const imageRef = storageRef.child(path);
    const snapshot = await imageRef.put(fileObj);
    return path;
}


export async function getImagePathFromRefPath(refPath) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(refPath);
    return await imageRef.getDownloadURL();
}
