import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {userData} from '../../data/userData';
const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {userData &&
          userData.map((story, index) => {
            return (
              <View key={index} style={{alignItems: 'center'}}>
                <TouchableOpacity>
                  <Image source={{uri: story.Image}} style={styles.story} />
                  <Text style={{color: 'white'}}>
                    {story.user.length > 11
                      ? story.user.slice(0, 6).toLowerCase() + '...'
                      : story.user}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 12,
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#ff8501',
  },
});

export default Stories;
