import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Divider} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const Post = props => {
  const postData = JSON.parse(props.post);

  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={postData} />
      <PostImage post={postData} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter post={postData} />
        <Likes post={postData} />
        <Caption post={postData} />
        <CommentSection post={postData} />
        <Comment post={postData} />
      </View>
    </View>
  );
};

const PostHeader = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        paddingBottom:5,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: props?.post?.user?.profilePicture}}
          style={styles.story}
        />
        <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>
          {props?.post?.user?.username}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={{color: 'white', fontWeight: '900', fontSize: 20}}>
          {' '}
          ...{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PostImage = props => (
  <View style={{width: '100%', height: 450}}>
    <Image
      source={{uri: props?.post?.imageUrl}}
      style={{height: '100%', resizeMode: 'cover'}}
    />
  </View>
);

const PostFooter = props => {
  const handleLike = () => {
    const currentLikeStatus = !props.post.likes_by_user.includes(
      auth().currentUser.email,
    );
    firestore()
      .collection('Users')
      .doc(props.post.owner_email)
      .collection('posts')
      .doc(props.post.id)
      .update({
        likes_by_user: currentLikeStatus
          ? firestore.FieldValue.arrayUnion(auth().currentUser.email)
          : firestore.FieldValue.arrayRemove(auth().currentUser.email),
      });
  };
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          width: '32%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={handleLike}>
          <Image
            style={styles.footerIcon}
            source={
              props.post.likes_by_user.includes(auth().currentUser.email)
                ? require('../../assets/heart-icon.png')
                : require('../../assets/header-like-icon.png')
            }
          />
        </TouchableOpacity>
        <Icon
          imgstyle={styles.footerIcon}
          imgurl={require('../../assets/footer-comment-icon.png')}
        />
        <Icon
          imgstyle={styles.footerShareIcon}
          imgurl={require('../../assets/footer-share-icon.png')}
        />
      </View>
      <View>
        <Icon
          imgstyle={styles.footerSaveIcon}
          imgurl={require('../../assets/icons8-save-64.png')}
        />
      </View>
    </View>
  );
};

const Icon = ({imgstyle, imgurl}) => (
  <TouchableOpacity>
    <Image style={imgstyle} source={imgurl} />
  </TouchableOpacity>
);

const Likes = props => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color: 'white', fontWeight: '600'}}>
      {props?.post?.likes_by_user?.length} likes
    </Text>
  </View>
);

const Caption = props => (
  <View style={{marginTop: 5}}>
    <Text style={{color: 'white'}}>
      <Text style={{fontWeight: '600'}}>{props.post.user.username} </Text>
      <Text> {props?.post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = props => (
  <View style={{marginTop: 5}}>
    {props?.post?.commnets?.length && (
      <Text style={{color: 'gray'}}>
        View {props?.post?.commnets.length > 1 ? 'all' : ''}{' '}
        {props?.post?.commnets.length}{' '}
        {props?.post?.commnets.length > 1 ? 'Comments' : 'Comment'}
      </Text>
    )}
  </View>
);

const Comment = props => (
  <>
    {props.post.comments &&
      props.post.comments.map((comment, index) => (
        <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={{color: 'white'}}>
            <Text style={{fontWeight: '600'}}>{comment.user} </Text>
            {comment.comment}
          </Text>
        </View>
      ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    marginTop: 10,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 30,
    height: 30,
    margin: 3,
  },
  footerShareIcon: {
    width: 29,
    height: 29,
    margin: 3,
    transform: [{rotate: '20deg'}],
  },
  footerSaveIcon: {
    width: 29,
    height: 29,
    margin: 3,
  },
});

export default Post;
