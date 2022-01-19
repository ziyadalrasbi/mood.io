import React, { useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import GenreSelectStyles from './GenreSelectStyles';
import { useFonts } from 'expo-font';

const GenreSelect = ({ seeds }) => {

  const [loaded] = useFonts({
    InconsolataBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });
  
  const ref = useRef(null);
  const [selectedItems, setSelectedItems] = React.useState([])
  const [selectedObjects, setSelectedObjects] = React.useState([]);
  const removeAll = () => {
    ref.current?._removeAllItems()
  }
  const toggle = () => {
    ref.current?._toggleSelector()
  }

  console.log(selectedObjects)
  return (
    <View style={{ height: 130 }}>
      <SectionedMultiSelect
        uniqueKey="id"
        displayKey="title"
        single={false}
        alwaysShowSelectText={true}
        onSelectedItemsChange={setSelectedItems}
        onSelectedItemObjectsChange={setSelectedObjects}
        selectedItems={selectedItems}
        selectText='Select Genres'
        items={seeds}
        ref={ref}
        renderSelectText={() =>
          <Button
            style={GenreSelectStyles.selectButton}
            uppercase={false}
            mode="contained"
            labelStyle={GenreSelectStyles.selectText}
          >
            select genres
          </Button>
        }
        customChipsRenderer={(props) => (
          <ScrollView
            horizontal
            style={{
              height: 58,
              marginTop:-10
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 8,
            }}
          >
            {selectedItems.map((itemId) => {
              const item = seeds.find(({ id }) => id === itemId)
              return (
                <View
                  style={{
                    marginRight: 10,
                    alignItems: 'center',
                    marginBottom: 6,
                    paddingVertical: 4,
                    backgroundColor: '#e8e8e8',
                    borderRadius: 24,
                    flexDirection: 'row',
                    borderColor: props.colors.chipColor,
                    borderWidth: 1
                  }}
                  key={item.id}
                >
                  <Text
                    style={{
                      fontFamily: 'InconsolataBold',
                      fontSize: 13,
                      color: 'black',
                      marginLeft: 16
                    }}
                  >
                    {item.title}
                  </Text>
                  <TouchableOpacity
                    style={{ padding: 4, marginRight: 8 }}
                    onPress={() => ref.current?._removeItem(item)}
                  >
                    <Icon name="close" size={15} />
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        )}
        IconRenderer={Icon}
        icons={{
          check: {
            name: 'check-circle',
            style: {
              color: Colors.secondary
            },
            size: 22
          },
          search: {
            name: 'search',
            color: '#333',
            size: 22
          }
        }}
      />
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: selectedObjects.length > 0? -10 : -40 }}>
        <Button
          style={GenreSelectStyles.clearButton}
          disabled={selectedObjects.length > 0 ? false : true}
          uppercase={false}
          mode="contained"
          labelStyle={GenreSelectStyles.selectText}
          onPress={removeAll}
        >
          clear
        </Button>
        <Button
          style={GenreSelectStyles.continueButton}
          disabled={selectedObjects.length > 5 ? false : true}
          uppercase={false}
          mode="contained"
          labelStyle={GenreSelectStyles.selectText}
          onPress={removeAll}
        >
          continue
        </Button>
      </View>
    </View>

  )
}

export default GenreSelect;