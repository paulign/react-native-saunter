import * as firebase from 'firebase/app';
import 'firebase/database';
import { Constants } from 'expo';

const { firebaseConfig } = Constants.manifest.extra;

firebase.initializeApp(firebaseConfig);

export default firebase;