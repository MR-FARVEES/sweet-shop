import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, Dimensions, TextInput } from "react-native"

const { width } = Dimensions.get("window")
const isTablet = width >= 600 

export const GlobalCSS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  veritcalGap: {
    marginTop: 10,
  },
  formContainer: {
    margin: 20,
    marginTop: 50,
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formText: {
    fontSize: 16,
  },
  formInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 8,
  },
  formInput: {
    flex: 1,
    paddingLeft: 10,
  },
  formInputIcon: {
    padding: 10,
    alignSelf: "center",
  },
  formButtonContainer: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
  },
  formButton: {
    marginBottom: isTablet ? 0 : 10,
    borderRadius: 999,
  },
  formButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  formLink: {
    margin: 10,
    textAlign: "center",
  },
  formError: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  formErrorText: {
    color: "#721c24",
    fontSize: 16,
  },
  formSuccess: {
  },
  formSuccessText: {
  },
  bgSuccess: {
    backgroundColor: "#33b249",
  },
  bgInfo: {
    backgroundColor: "#5783db",
  },
  textSucess: {
    color: "#33b249",
  },
  textInfo: {
    color: "#5783db",
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  bottomNavBarButton: {
    alignItems: "center"
  },
  bottomTabBarButtonText: {
    marginVertical: 5,
    fontSize: 12,
  },
  screen: {
    flex: 1, 
  },
  screenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  screenHeaderText: {
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 10,
    marginTop: 5,
  },
  screenHeaderDate: {
    fontSize: 16,
    fontWeight: 500,
    marginRight: 10,
    marginTop: 10,
    color: "#666666"
  },
  screenGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10
  },
  screenGridColumnShadow: {
    width: '48%',
    backgroundColor: 'rgba( 0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 1.5,
    marginBottom: 15,
  },
  screenGridColumn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 7,
  },
  columnHeader: {
    flexDirection: "row",
  },
  columnHeaderText: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: 600
  },
  columnContent: {
    padding: 3,
    paddingTop: 0,
  },
  columnContentTextHighlight: {
    fontSize: 20,
    fontWeight: 900,
  },
  columnContentSummaryContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  columnContainerSummaryText: {
    marginLeft: 5,
    fontSize: 11,
    color: '#8a8a8a',
  },
  incrementText: {
    color: '#00b300',
  },
  decrementText: {
    color: '#ff3d3d',
  },
  filterContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 10,
    paddingLeft: 10,
  },
  dropDownContainer: {
    minWidth: 'auto',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#000',
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  dropDownListContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    zIndex: 10,
    borderRadius: 5,
    marginTop: 3,
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 4,
    borderRadius: 6,
  },
  topNavBarMenu: {
    minWidth: '33%',
    borderRadius: 6,
  },
  topNavBarMenuText: {
    textAlign: 'center',
    padding: 3
  }
});