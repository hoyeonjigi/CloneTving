package site.hoyeonjigi.clonetving.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionAdvice {
    
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> errorHandler (UsernameNotFoundException e) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> errorHandler (RuntimeException e) {
    	return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(e.getMessage());
    }

    @ExceptionHandler(TokenNotValidateException.class)
    public ResponseEntity<String> errorHandler (TokenNotValidateException e) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
}
