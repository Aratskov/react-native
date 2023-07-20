import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";

import {
  Button,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FIREBASE_DB } from "../../config";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSelect";

export const CommentsScreen = () => {
  const {
    params: { photo: mainPhoto, id },
  } = useRoute();
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");
  const { uid, avatar } = useSelector(selectUser);
  const user = useSelector(selectUser);

  useLayoutEffect(() => {
    const msgCollectionRef = collection(
      FIREBASE_DB,
      `user/${uid}/posts/${id}/comment`
    );

    const unsubscribe = onSnapshot(msgCollectionRef, (comment) => {
      const messages = comment.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const sendComment = async () => {
    const msg = comment.trim();
    if (msg === '') return alert("Min 1 symbol");

    const msgCollectionRef = collection(
      FIREBASE_DB,
      `user/${uid}/posts/${id}/comment`
    );

    await addDoc(msgCollectionRef, {
      comment: msg,
      sender: uid,
      createAt: serverTimestamp(),
    });

    setComment("");
  };

  const renderComment = ({ item }) => {
    const myComment = item.sender === uid;
    return (
      <View
        style={myComment ? styles.rowReverseDirection : styles.rowDirection}
      >
        <View style={styles.avatar}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <View
          style={[
            styles.messageContainer,
            myComment
              ? styles.userMessageContainer
              : styles.otherMessageContainer,
          ]}
        >
          <Text style={styles.messageText}>{item.comment}</Text>
          <Text style={styles.messageDate}>
            {item.createAt?.toDate().toLocaleDateString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.wrapContent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Image source={{ uri: mainPhoto }} style={styles.image} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.wrapComment}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            style={styles.messageInput}
            placeholder="Коментувати..."
            multiline
          />
          <Button
            disabled={comment === ""}
            title="Send"
            onPress={sendComment}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapContent: {
    flex: 1,
    paddingHorizontal: 16,
    overflow: "scroll",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 32,
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  wrapComment: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    minHeight: 50,
    paddingTop: 32,
    paddingBottom: 16,
  },
  messageInput: {
    flex: 1,
    padding: 16,
    paddingTop: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 25,
  },
  rowDirection: {
    flexDirection: "row",
    gap: 16,
  },
  rowReverseDirection: {
    flexDirection: "row-reverse",
    gap: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    // backgroundColor: "red",
    borderRadius: 25,
  },
  messageContainer: {
    padding: 16,
    marginBottom: 24,
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",

    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
  },
  messageText: {
    color: "#212121",
    fontFamily: "Roboto_400Regular",
    fontSize: 13,
  },
  messageDate: {
    marginTop: 8,
    color: "#BDBDBD",
    textAlign: "right",
    fontSize: 10,
    fontFamily: "Roboto_400Regular",
  },
});
