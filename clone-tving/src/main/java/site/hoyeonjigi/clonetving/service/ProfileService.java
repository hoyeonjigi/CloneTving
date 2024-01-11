package site.hoyeonjigi.clonetving.service;

import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import java.util.List;


public interface ProfileService {
    String registProfile(RegistProfileDto profile);
}
