import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../store/action";
import React from "react";

const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.selectedItem);
  const dispatch = useDispatch()

  console.log("cart k ander", cartItems);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.id.price;
    });
    return total;
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderColor: "#d70f64",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Cart Items{" "}
              </Text>
              <Text
                style={{ color: "#d70f64", fontWeight: "bold", fontSize: 20 }}
              >
                {cartItems.length}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderColor: "#d70f64",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total </Text>
              <Text
                style={{ color: "#d70f64", fontWeight: "bold", fontSize: 20 }}
              >
                {calculateTotal()}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", marginBottom: 100 }}>
          <ScrollView>
            {!cartItems.length ? (
              <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: "bold" }}>
                  No any singal items !
                </Text>
              </View>
            ) : (
              <>
                {cartItems.map((items,i) => {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: 10,
                          alignItems: "center",
                        }}
                        key={i}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {/* <View>
                            <Image
                              style={styles.images}
                              source={{ uri: items.menuData.id.image }}
                            />
                          </View> */}

                          <View style={{ paddingLeft: 15 }}>
                            <Text
                              style={{
                                fontWeight: "bold",
                                width: 200,
                                // fontSize: 20,
                              }}
                            >
                              {items.id.name}
                            </Text>
                            <Text style={{ color: "#d70f64" }}>
                              Rs. {items.id.price}
                            </Text>
                          </View>
                        </View>

                        <View style={{ paddingRight: 10 }}>
                          <MaterialCommunityIcons
                            onPress={() => {dispatch(removeItem(items))}}
                            name="archive-remove-outline"
                            size={34}
                            color="#d70f64"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          borderBottomColor: "#DCDCDC",
                          borderBottomWidth: 1,
                        }}
                      />
                    </>
                  );
                })}
              </>
            )}

            {!cartItems?.length ? (
              <View style={{ padding: 20, backgroundColor: "#fff" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: "#d70f64" }}>Add Item</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ padding: 20, backgroundColor: "#fff" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: "#d70f64" }}>Add More Item</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Cart;
