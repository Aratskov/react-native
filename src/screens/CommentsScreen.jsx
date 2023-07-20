import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FIREBASE_DB } from "../../config";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSelect";
import { AntDesign } from "@expo/vector-icons";

export const CommentsScreen = () => {
  const {
    params: { photo: mainPhoto, id },
  } = useRoute();
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");
  const { uid, avatar } = useSelector(selectUser);

  useLayoutEffect(() => {
    const msgCollectionRef = collection(
      FIREBASE_DB,
      `user/${uid}/posts/${id}/comment`
    );
    const q = query(msgCollectionRef, orderBy("createAt"));

    const unsubscribe = onSnapshot(q, (comment) => {
      const messages = comment.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const sendComment = async () => {
    const msg = comment.trim();
    if (msg === "") return alert("Min 1 symbol");

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

  function formatDate(timestamp) {
    const months = [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ];

    const date = timestamp?.toDate();
    const day = date?.getDate();
    const month = months[date?.getMonth()];
    const year = date?.getFullYear();
    const hours = date?.getHours();
    const minutes = String(date?.getMinutes()).padStart(2, "0");

    return `${day} ${month}, ${year} | ${hours}:${minutes}`;
  }

  const renderComment = ({ item }) => {
    const myComment = item.sender === uid;
    return (
      <View
        style={myComment ? styles.rowReverseDirection : styles.rowDirection}
      >
        <View style={styles.avatar}>
          <Image
            source={{ uri: myComment ? avatar : null }}
            style={styles.avatar}
          />
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
          <Text
            style={[
              styles.messageDate,
              myComment ? styles.userMessageDate : styles.otherMessageDate,
            ]}
          >
            {formatDate(item.createAt)}
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
          <TouchableOpacity
            disabled={comment === ""}
            style={styles.sendButton}
            onPress={sendComment}
          >
            <AntDesign name="arrowup" size={20} color="white" />
          </TouchableOpacity>
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
    position: "relative",
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
    backgroundColor: "#FF6C00",
    borderRadius: 25,
  },
  messageContainer: {
    padding: 16,
    marginBottom: 24,
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",

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
    fontSize: 10,
    fontFamily: "Roboto_400Regular",
  },
  userMessageDate: {
    textAlign: "left",
  },
  otherMessageDate: {
    textAlign: "right",
  },
  sendButton: {
    position: "absolute",
    right: 8,
    bottom: 24,

    justifyContent: "center",
    alignItems: "center",

    width: 34,
    height: 34,

    backgroundColor: "#FF6C00",
    borderRadius: "50%",
  },
});
