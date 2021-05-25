package searchnsketch;

public class Application {

    public static void main(String[] args) {

        String[] testReferencesArray = new String[]{
             "https://images.unsplash.com/photo-1620222729313-e0202e1b36c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
             "https://images.unsplash.com/photo-1620222729337-5779759a6ccd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
             "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
             "https://images.unsplash.com/photo-1547568082-683867ef8c5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80"
        };

        ReferenceTimer testTimer = new ReferenceTimer();
        testTimer.setReferenceURLs(testReferencesArray);
        testTimer.drawingSessionTimer(3);

    }
}
