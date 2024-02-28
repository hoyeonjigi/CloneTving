package site.hoyeonjigi.clonetving.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(){
    }

    public ResourceNotFoundException(String s){
        super(s);
    }
}
