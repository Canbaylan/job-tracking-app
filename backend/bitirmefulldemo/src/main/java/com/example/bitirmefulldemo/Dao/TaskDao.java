package com.example.bitirmefulldemo.Dao;



import com.example.bitirmefulldemo.POJO.Task;
import com.example.bitirmefulldemo.wrapper.MusteriWrapper;
import com.example.bitirmefulldemo.wrapper.TaskWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface TaskDao extends JpaRepository<Task,Integer> {
    List<TaskWrapper> getTask(@Param("userId") int id);
    List<TaskWrapper> getBid(@Param("userId") int id);
    List<TaskWrapper> getBidtoMusteriId(@Param("userId") int id,@Param("musteriId") int musteriId);
    TaskWrapper getTaskById(@Param("id") int id);

    @Transactional
    @Modifying
    Integer deleteTask(@Param("id") int id);

    @Transactional
    @Modifying
    Integer changeToTask(@Param("id") int id);

    @Transactional
    @Modifying
    Integer changeToBid(@Param("id") int id);

    @Transactional
    @Modifying
    Integer completedToTask(@Param("id") int id);

    @Transactional
    @Modifying
    Integer updateTask(@Param("id") int id, @Param("isIcerigi") String isIcerigi ,@Param("siparisTarihi") String siparisTarihi,
                       @Param("en") String en, @Param("boy") String boy,@Param("adet") String adet,@Param("birimFiyat") String birimFiyat,
                       @Param("tutar") String tutar,@Param("durum") String durum,@Param("firma") String firma);
}
