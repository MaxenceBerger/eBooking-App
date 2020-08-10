package org.capacitor.quasar.app.notifications;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import org.capacitor.quasar.app.R;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.capacitor.quasar.app.MainActivity;

public class NotificationsService extends FirebaseMessagingService {

  private final int NOTIFICATION_ID = 007;
  private final String NOTIFICATION_TAG = "FIREBASEEBOOKING";

  @RequiresApi(api = Build.VERSION_CODES.O)
  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
    if (remoteMessage.getNotification() != null) {
      String message = remoteMessage.getNotification().getBody();
      // 8 - Show notification after received message
      this.sendVisualNotification(message);
    }
  }

  // ---

  @RequiresApi(api = Build.VERSION_CODES.O)
  private void sendVisualNotification(String messageBody) {

    // 1 - Create an Intent that will be shown when user will click on the Notification
    Intent intent = new Intent(this, MainActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);

    // 2 - Create a Style for the Notification
    NotificationCompat.InboxStyle inboxStyle = new NotificationCompat.InboxStyle();
    inboxStyle.setBigContentTitle(getString(R.string.notification_title));
    inboxStyle.addLine(messageBody);

    // 3 - Create a Channel (Android 8)
    String channelId = getString(R.string.default_notification_channel_id);

    // 4 - Build a Notification object
    NotificationCompat.Builder notificationBuilder =
      new NotificationCompat.Builder(this, channelId)
        .setSmallIcon(R.drawable.ic_stat_name)
        .setContentTitle(getString(R.string.app_name))
        .setContentText(getString(R.string.notification_title))
        .setAutoCancel(true)
        .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
        .setContentIntent(pendingIntent)
        .setStyle(inboxStyle);

    // 5 - Add the Notification to the Notification Manager and show it.
    NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

    // 6 - Support Version >= Android 8
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      CharSequence channelName = "Message provenant de eBooking";
      int importance = NotificationManager.IMPORTANCE_HIGH;
      NotificationChannel mChannel = new NotificationChannel(channelId, channelName, importance);
      notificationManager.createNotificationChannel(mChannel);
    }

    // 7 - Show notification
    notificationManager.notify(NOTIFICATION_TAG, NOTIFICATION_ID, notificationBuilder.build());
  }
}
