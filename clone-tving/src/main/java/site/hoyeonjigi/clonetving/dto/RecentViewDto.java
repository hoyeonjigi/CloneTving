package site.hoyeonjigi.clonetving.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class RecentViewDto {

    private ProfileDto profile;
    private ContentDto content;
    private Timestamp viewDate;
    private boolean favoriteContent;
}
