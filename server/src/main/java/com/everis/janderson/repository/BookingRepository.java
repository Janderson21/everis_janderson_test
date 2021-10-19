package com.everis.janderson.repository;

import com.everis.janderson.model.Booking;
import com.everis.janderson.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Query(value = "SELECT * FROM BOOKING B WHERE B.USER = :user", nativeQuery = true)
    Booking getBookingByUser(@Param("user") Integer user);
}
