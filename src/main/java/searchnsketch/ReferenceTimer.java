package searchnsketch;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class ReferenceTimer {

    private List<String> referenceURLs = new ArrayList<String>();

    public void setReferenceURLs(String[] arrayOfURLs) {
        for ( int i = 0 ; i < arrayOfURLs.length ; i++ ) {
            referenceURLs.add(arrayOfURLs[i]);
        }
    }

    public void drawingSessionTimer(int timeInSeconds) {

        for (String imageURL : referenceURLs) {
            System.out.println("Your reference image can be found at: " + imageURL);
            try {
                for (int i = timeInSeconds; i >= 0; i--) {
                    TimeUnit.SECONDS.sleep(1);
                    System.out.println("Time remaining: " + i + " Seconds");
                    if (i == 0) {
                        System.out.println("Please prepare for your next drawing...");
                        TimeUnit.SECONDS.sleep(5);
                    }
                }
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
            }
        }
        System.out.println("This concludes your drawing session!");

    }

}