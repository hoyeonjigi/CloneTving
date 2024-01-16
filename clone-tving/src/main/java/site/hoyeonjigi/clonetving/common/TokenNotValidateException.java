package site.hoyeonjigi.clonetving.common;

import io.jsonwebtoken.JwtException;

public class TokenNotValidateException extends JwtException{

    public TokenNotValidateException(String message) {
        super(message);
    }

    public TokenNotValidateException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
