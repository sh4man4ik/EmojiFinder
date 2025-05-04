package emoji.finder.EmojiFinder;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class EmojiProcess {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/send")
    public String inputProcess(@RequestBody UserMessageDTO input) {
        String userInputText = input.getMessage();

        String url;
        if (userInputText.equals("randomButton123456")) {
            url = "https://api.emojisworld.fr/v1/random?limit=1";
        } else {
            url = "https://api.emojisworld.fr/v1/search?q=" + userInputText;
        }

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response.getBody();
    }

    public static class UserMessageDTO {
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
