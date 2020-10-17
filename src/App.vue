<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core'

const { PushNotifications } = Plugins

export default {
  name: 'App',
  data () {
    return {
      position: 'determining...'
    }
  },
  methods: {
    requestPermission () {
      PushNotifications.requestPermission().then(result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register()

          // On success, we should be able to receive notifications
          PushNotifications.addListener('registration',
            (token = PushNotificationToken) => {
              alert('Push registration success, token: ' + token.value)
            }
          )

          // Some issue with our setup and push will not work
          PushNotifications.addListener('registrationError',
            (error) => {
              alert('Error on registration: ' + JSON.stringify(error))
            }
          )

          // Show us the notification payload if the app is open on our device
          PushNotifications.addListener('pushNotificationReceived',
            (notification = PushNotification) => {
              alert('Push received: ' + JSON.stringify(notification))
            }
          )

          // Method called when tapping on a notification
          PushNotifications.addListener('pushNotificationActionPerformed',
            // (notification = PushNotificationActionPerformed) => {
            (notification = PushNotification) => {
              alert('Push action performed: ' + JSON.stringify(notification))
              console.log(notification)
            }
          )
        } else {
          // Show some error
        }
      })
    }
  },
  mounted () {
    this.requestPermission()
  }
}
</script>
