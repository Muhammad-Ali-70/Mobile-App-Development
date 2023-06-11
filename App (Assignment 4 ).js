import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E2e2e2",
  },
  textstyle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  inputFeild: {
    paddingVertical: 6,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "solid",
    width: 250,
    marginVertical: 20,
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#102030",
    width: 250,
    borderRadius: 8,
    padding: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#e6002f",
  },
  homeText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  homeTextSubheading: {
    fontSize: 18,
    marginTop: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#e6002f",
  },
  featureText: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "bold",
  },
  offerText: {
    fontSize: 16,
    marginTop: 8,
  },
  packageText: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "bold",
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  historyText: {
    fontSize: 16,
    marginTop: 8,
  },
  usageText: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "bold",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="mainpage"
          component={MainPage}
          options={{
            title: "Welcome Back",
            headerStyle: {
              backgroundColor: "#e6002f",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontFamily: "monospace",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="newaccountRegister"
          component={NewAccountPage}
          options={{
            title: "Register with New Number",
            headerStyle: {
              backgroundColor: "#e6002f",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontFamily: "monospace",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="accountMainScreen"
          component={AccountMainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExplorePage"
          component={ExplorePageComp}
          options={{ title: "This is Explore Page" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainPage({ navigation }) {
  const [checkPasword, SetCheckPassword] = useState('');
  const [checkPhone, SetCheckPhone] = useState('');

  const getItem = async () => {
    try {
      const serializedValue = await AsyncStorage.getItem("myKey");
      if (serializedValue !== null) {
        const value = JSON.parse(serializedValue);

        console.log("Item retrieved successfully:", value);

        if (checkPhone === value.Number && checkPasword === value.Password) {
          SetCheckPassword('');
          SetCheckPhone('');
          navigation.navigate("accountMainScreen");
        } else {
          console.log("Invalid Credentials");
        }
      } else {
        console.log("Item not found.");
      }
    } catch (error) {
      console.error("Error getting item :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/speed1.png")}
        style={{ width: 400, height: 150, marginBottom: 70 }}
      ></Image>
      <Text style={styles.textstyle}>Sign In With Number</Text>

      <TextInput
        style={styles.inputFeild}
        placeholder="03XXXXXXXXX"
        value= {checkPhone}
        onChangeText={(newcheckN) => {
          SetCheckPhone(newcheckN);
        }}
      ></TextInput>

      <TextInput
        style={styles.inputFeild}
        placeholder="Password"
        value= {checkPasword}
        onChangeText={(newcheck) => {
          SetCheckPassword(newcheck);
        }}
      ></TextInput>

      <TouchableOpacity style={styles.buttonContainer} onPress={getItem}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("newaccountRegister");
        }}
      >
        <Text style={styles.buttonText}>Register with New Number</Text>
      </TouchableOpacity>
    </View>
  );
}

function NewAccountPage({ navigation }) {
  const [registerNumber, setRegisterNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const SetVALUE = async () => {
    console.log("PhoneNumber: ", registerNumber);
    console.log("Email: ", registerEmail);
    console.log("Password: ", registerPassword);

    if (
      registerNumber != null &&
      registerEmail != null &&
      registerPassword != null
    ) {
      const MyObject = {
        Number: registerNumber,
        Email: registerEmail,
        Password: registerPassword,
      };
      const SerializedValue = JSON.stringify(MyObject);

      try {
        await AsyncStorage.setItem("myKey", SerializedValue);
        console.log("Value Set Successfully");
        setRegisterEmail("");
        setRegisterNumber("");
        setRegisterPassword("");
      } catch (error) {
        console.log("Error Occurred:", error);
      }
    } else {
      console.log("Null Values");
      Alert.alert("Values are Null");
    }
  };

  const deleteItem = async () => {
    try {
      const serializedValue = await AsyncStorage.getItem("myKey");
      if (serializedValue != null) {
        await AsyncStorage.removeItem("myKey");
        console.log("Item deleted successfully.");
      } else {
        console.log("Value is Null");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>Register with New Number</Text>
      <TextInput
        style={styles.inputFeild}
        placeholder="03XXXXXXXXX"
        value={registerNumber}
        onChangeText={(newNum) => setRegisterNumber(newNum)}
      ></TextInput>

      <TextInput
        style={styles.inputFeild}
        placeholder="Enter Your Email"
        value={registerEmail}
        onChangeText={(newEmail) => setRegisterEmail(newEmail)}
      ></TextInput>

      <TextInput
        style={styles.inputFeild}
        placeholder="Set Your Password"
        secureTextEntry={true}
        value={registerPassword}
        onChangeText={(newPass) => setRegisterPassword(newPass)}
      ></TextInput>

      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={SetVALUE}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={deleteItem}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("mainpage");
        }}
      >
        <Text style={styles.buttonText}>Already a Member, Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

function AccountMainScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#102030" },
      }}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "lightgrey",
      }}
    >
      <Tab.Screen
        name="Account_Home"
        component={AccountMain_Drawer}
        options={{ headerShown: false, title: "Home" }}
      ></Tab.Screen>

      <Tab.Screen
        name="Account_Offers"
        component={Offers_Drawers}
        options={{ headerShown: false, title: "Offers" }}
      ></Tab.Screen>
      <Tab.Screen
        name="Account_History"
        component={History_Drawer}
        options={{ headerShown: false, title: "History" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const CustomDrawer = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "lightgrey", flex: 1 }}>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate("Welcome")}
        color="#102030"
      />
      <Text> </Text>
      <Button
        title="Offers"
        onPress={() => navigation.navigate("Offers")}
        color="#102030"
      />
      <Text> </Text>
      <Button
        title="History"
        onPress={() => navigation.navigate("History")}
        color="#102030"
      />
      <Text> </Text>
      <Button
        title="Explore"
        onPress={() => navigation.navigate("ExplorePage")}
        color="#102030"
      />
    </View>
  );
};

function AccountMain_Drawer({ navigation }) {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Welcome"
        component={AccountHomePage}
        options={{
          title: "Welcome to Speed Link",
          headerStyle: {
            backgroundColor: "#e6002f",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "monospace",
            fontWeight: "bold",
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("mainpage")}
              title="Sign Out"
              color="#102030"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Offers_Drawers() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Offers"
        component={OffersPage}
        options={{
          title: "Offers",
          headerStyle: {
            backgroundColor: "#e6002f",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "monospace",
            fontWeight: "bold",
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("mainpage")}
              title="Sign Out"
              color="#102030"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AccountHomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Welcome to Speed Link - Unleash the Power of Lightning-Fast Internet!
      </Text>
      <Text style={styles.homeText}>
        We are the leading Internet Service Provider in town, providing
        high-speed and reliable internet connections to our customers.
      </Text>
      <Text style={styles.homeText}>
        With our state-of-the-art infrastructure and exceptional customer
        service, we strive to deliver the best internet experience to you.
      </Text>
      <Text style={styles.homeTextSubheading}>Our main Features include:</Text>
      <Text style={styles.featureText}>
        - Blazing fast internet speeds up to 1 Gbps
      </Text>
      <Text style={styles.featureText}>
        - Unlimited data usage without any throttling
      </Text>
      <Text style={styles.featureText}>
        - Affordable packages tailored to your needs
      </Text>
      <Text style={styles.featureText}>
        - Advanced security measures to protect your online activities
      </Text>
      <Text style={styles.featureText}>
        - 24/7 customer support to assist you with any queries or concerns
      </Text>
      <Text style={styles.featureText}>
        - Easy installation and setup process for hassle-free connectivity
      </Text>
    </View>
  );
}

function OffersPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Special Offers</Text>
      <Text style={styles.offerText}>
        1. Get 50% off on your first month's subscription.
      </Text>
      <Text style={styles.offerText}>
        2. Upgrade to a higher internet speed and get free installation.
      </Text>
      <Text style={styles.offerText}>
        3. Refer a friend and both of you will receive a discount on your bills.
      </Text>
      <Text style={styles.offerText}>
        4. Enjoy unlimited data usage for the first three months.
      </Text>
      <Text style={styles.offerText}>
        5. Subscribe to our premium package and receive a free Wi-Fi router.
      </Text>
      <Text style={styles.offerText}>
        6. Participate in our online contest and stand a chance to win exciting
        prizes.
      </Text>

      <Text style={styles.heading1}>Ongoing Packages</Text>
      <Text style={styles.packageText}>
        - Basic Package: 50 Mbps internet speed, unlimited data, $29.99 per
        month
      </Text>
      <Text style={styles.packageText}>
        - Standard Package: 100 Mbps internet speed, unlimited data, $39.99 per
        month
      </Text>
      <Text style={styles.packageText}>
        - Premium Package: 250 Mbps internet speed, unlimited data, $49.99 per
        month
      </Text>
      <Text style={styles.packageText}>
        - Ultimate Package: 500 Mbps internet speed, unlimited data, $59.99 per
        month
      </Text>
    </View>
  );
}

function History_Drawer() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="History"
        component={HistoryPage}
        options={{
          title: "Usage History",
          headerStyle: {
            backgroundColor: "#e6002f",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "monospace",
            fontWeight: "bold",
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("mainpage")}
              title="Sign Out"
              color="#8f33ff"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function HistoryPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Connection History</Text>
      <Text style={styles.historyText}>
        1. June 1, 2023 - Connected to the internet at 8:00 AM
      </Text>
      <Text style={styles.historyText}>
        2. May 30, 2023 - Disconnected from the internet at 10:00 PM
      </Text>
      <Text style={styles.historyText}>
        3. May 28, 2023 - Upgraded internet speed to 100 Mbps
      </Text>
      <Text style={styles.historyText}>
        4. May 25, 2023 - Monthly bill payment
      </Text>

      <Text style={styles.heading1}>Usage History</Text>
      <Text style={styles.usageText}>- June 2023: Consumed 200 GB of data</Text>
      <Text style={styles.usageText}>- May 2023: Consumed 150 GB of data</Text>
      <Text style={styles.usageText}>
        - April 2023: Consumed 180 GB of data
      </Text>
      <Text style={styles.usageText}>
        - March 2023: Consumed 120 GB of data
      </Text>
    </View>
  );
}

function ExplorePageComp() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>Explore Page</Text>
    </View>
  );
}
