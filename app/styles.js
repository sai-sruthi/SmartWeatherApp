import { Dimensions, StyleSheet } from 'react-native';

const tabwidth = Dimensions.get('window').width/3; 
const gray = '#cccccc';
const blue = '#5DBCD2';
const white = '#ffffff';
const red = '#ff4444';
const pink = '#ffaaaa';
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5078ba',
    },
    weatherInfoLarge: {
        textAlign: 'center',
        fontSize: 80,
        fontWeight: "600",
        margin: 5,
        color: white,
    },
    weatherInfo: {
        textAlign: 'center',
        fontSize: 18,
        margin: 5,
        color: white,
    },
    location:{
        flexDirection:"row", 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    locationName:{
        fontSize: 18,
    },
    temperature:{
        flexDirection:"row", 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    temperatureValue:{
        fontSize: 60,
        color: white,
        marginHorizontal: 10
    },
    cardContainer:{
        backgroundColor: '#648dd1',
        opacity: 0.8,
        borderRadius: 20,
        marginTop: 25
    },
    // cardMargin:{
    //     marginTop: 40
    // },
    weatherCard:{
        flexDirection:"row",
        justifyContent: 'center',
        marginVertical: 7,
        marginHorizontal: 40

    },
    cardHead:{
        justifyContent: 'center',
        fontSize: 18,
    },
    weatherDetails:{
        flexDirection:"column",
        fontSize: 16,
        margin: 5,
        color: white,
    },
    tabContainer:{
        width: Dimensions.get('window').width,
        backgroundColor: '#648dd1',
        opacity: 0.9,
        marginTop: 25
    },
    tabbar:{
        flexDirection:"row",
        justifyContent: 'center',
        borderTopWidth:2,
        borderColor: '#446eb3'
    },
    tab:{
        width: tabwidth,
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        
    },
    tabLabel: {
        alignSelf: 'center',
        color: white,
        fontSize: 13,
    },
    searchbox: {
        textAlign: 'center',
        margin: 10,
        height: 40,
        marginTop: 50,
        borderColor: gray,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: white,
        borderRadius: 10,
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        borderColor: red,
        borderWidth: 1,
        backgroundColor: pink,
        padding: 5,
    },
    errorMessage: {
        textAlign: 'center',
        color: red,
        fontSize: 20,
        margin: 10,
    },
    options: {
        marginTop: 20,
        marginBottom: 15
    },
    optionWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    weatherIcon: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 64,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#5DBCD2',
        textAlign: 'center',
        justifyContent: 'center',
    },
    input: {
        borderColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 15,
        marginHorizontal: 70,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    largeInput: {
        borderColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 15,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },    
    label: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    btnLabel: {
        alignSelf: 'center',
        color: '#5DBCD2',
        fontSize: 14,
        fontWeight: 'bold',
    },
    sectionHeader: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    submit: {
        backgroundColor: '#EFEFEF',
        alignSelf: 'center',
        padding: 8,
        borderRadius: 10,
        marginBottom: 20,
    }
});

export default styles;
