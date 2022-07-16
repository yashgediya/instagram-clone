import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-elements';

const Post = props => {
  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={props.post} />
      <PostImage post={props.post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter />
        <Likes post={props.post} />
        <Caption post={props.post} />
        <CommentSection post={props.post} />
        <Comment post={props.post} />
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
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: props.post.profile_picture}}
          style={styles.story}
        />
        <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>
          {props.post.user}
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
      source={{uri: props.post.imageUrl}}
      style={{height: '100%', resizeMode: 'cover'}}
    />
  </View>
);

const PostFooter = () => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <View
      style={{
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
      }}>
      <Icon
        imgstyle={styles.footerIcon}
        imgurl={require('../../assets/header-like-icon.png')}
      />
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

const Icon = ({imgstyle, imgurl}) => (
  <TouchableOpacity>
    <Image style={imgstyle} source={imgurl} />
  </TouchableOpacity>
);

const Likes = props => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color: 'white', fontWeight: '600'}}>
      {props.post.likes} likes
    </Text>
  </View>
);

const Caption = props => (
  <View style={{marginTop: 5}}>
    <Text style={{color: 'white'}}>
      <Text style={{fontWeight: '600'}}>{props.post.user} </Text>
      <Text> {props.post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = props => (
  <View style={{marginTop: 5}}>
    {props.post.commnets.length && (
      <Text style={{color: 'gray'}}>
        View {props.post.commnets.length > 1 ? 'all' : ''}{' '}
        {props.post.commnets.length}{' '}
        {props.post.commnets.length > 1 ? 'Comments' : 'Comment'}
      </Text>
    )}
  </View>
);

const Comment = props => (
  <>
    {props.post.commnets &&
      props.post.commnets.map((comment, index) => (
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
