package site.hoyeonjigi.clonetving.domain;

import java.io.Serializable;

public class ProfileEntityPK implements Serializable{
    
    private String user;
    private String profileName;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((profileName == null) ? 0 : profileName.hashCode());
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
        ProfileEntityPK other = (ProfileEntityPK) obj;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (profileName == null) {
            if (other.profileName != null)
                return false;
        } else if (!profileName.equals(other.profileName))
            return false;
        return true;
    }
}
