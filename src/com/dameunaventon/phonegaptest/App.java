/*package com.dameunaventon.phonegaptest;

import android.app.Activity;
import android.os.Bundle;

public class App extends Activity {
    /** Called when the activity is first created. */
 /*   @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }
}*/

package com.dameunaventon.phonegaptest;

//import android.app.Activity;
import android.os.Bundle;

//import com.phonegap.*; 
import org.apache.cordova.*;

import com.strumsoft.websocket.phonegap.WebSocketFactory;

public class App extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	super.setBooleanProperty("keepRunning", true); 
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html",6000);
        //setIntegerProperty("loadUrlTimeoutValue", 1000000);
        
        this.appView.addJavascriptInterface(new WebSocketFactory(this), "WebSocketFactory");
    }
}