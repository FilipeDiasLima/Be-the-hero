import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text,TouchableOpacity, Image, Linking } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../../assets/logo.png';

export default function Detail(){
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Hello ${incident.name}, I'd like to help with ${incident.title} the case with ${Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(incident.value)}`;



  function navigateBack(){
    navigation.goBack();  
  }

  function sendEmail(){
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=5592991824283&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        
        <TouchableOpacity 
          onPress={navigateBack}
        >
          <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0 }]}>NGO:</Text>
        <Text style={styles.incidentValue}>{incident.name} {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>CASE:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALUE:</Text>
        <Text style={styles.incidentValue}>
              {Intl.NumberFormat('en-US',
              {style: 'currency', currency: 'USD',
               }).format(incident.value)}
            </Text>

      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero of this case</Text>

        <Text style={styles.heroDescription}>Contact:</Text>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.action}
            onPress={sendWhatsapp}
          >
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.action}
            onPress={sendEmail}
          >
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}