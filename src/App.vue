<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {
  Plugins,
  PushNotification
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

          // Some issue with our setup and push will not work
          PushNotifications.addListener('registrationError',
            (error) => {
              alert('Error on registration: ' + JSON.stringify(error))
            }
          )
          // Show us the notification payload if the app is open on our device
          PushNotifications.addListener('pushNotificationReceived',
            (notification = PushNotification) => {
              const notifyTitle = notification.title
              const notifyBody = notification.body
              this.$q.notify({
                color: 'blue-grey',
                message: notifyTitle,
                caption: notifyBody,
                progress: true,
                timeout: 5000,
                position: 'top'
              })
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
