package site.hoyeonjigi.clonetving.domain;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "recent_view")
@Data
@AllArgsConstructor
@IdClass(RecentViewEntityPK.class)
public class RecentViewEntity {
    
    @Id
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "user_id"),
        @JoinColumn(name = "profile_name")
    })
    private ProfileEntity profile;

    @Id
    @ManyToOne
    @JoinColumn(name = "content_id")
    private ContentsEntity content;

    @Column(nullable=false)
    private Timestamp viewDate;
    
    @Column(nullable=false)
    private boolean favoriteContent;
}
