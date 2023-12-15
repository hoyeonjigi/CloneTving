package site.hoyeonjigi.clonetving.domain;

import java.io.Serializable;

public class ContentJenreEntityPK implements Serializable{
    
    private String content;
    private String jenre;
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((content == null) ? 0 : content.hashCode());
        result = prime * result + ((jenre == null) ? 0 : jenre.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ContentJenreEntityPK other = (ContentJenreEntityPK) obj;
        if (content == null) {
            if (other.content != null)
                return false;
        } else if (!content.equals(other.content))
            return false;
        if (jenre == null) {
            if (other.jenre != null)
                return false;
        } else if (!jenre.equals(other.jenre))
            return false;
        return true;
    }
    
}
